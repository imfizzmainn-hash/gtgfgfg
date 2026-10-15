export const DATA_VERSION = 1;
export const VISIT_STATUS = Object.freeze({ DRAFT: "draft", SIGNED: "signed" });
export const DOCUMENT_SOURCES = Object.freeze([
  "clinic_authored",
  "owner_supplied",
  "imported",
  "external_verified",
  "ai_extracted_unverified",
]);

export function makeId(prefix = "id", random = () => globalThis.crypto.randomUUID()) {
  return `${prefix}_${random()}`;
}

export function petIdFor(state, random = () => globalThis.crypto.randomUUID()) {
  let candidate;
  do {
    candidate = `PET-${random().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
  } while (state.pets.some((pet) => pet.petId === candidate));
  return candidate;
}

export function validateDate(value, label = "Data") {
  if (!value) return;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label}: podaj prawidłową datę.`);
  }
}

function requireText(value, label, max = 180) {
  const text = String(value ?? "").trim();
  if (!text) throw new Error(`${label}: to pole jest wymagane.`);
  if (text.length > max) throw new Error(`${label}: maksymalnie ${max} znaków.`);
  return text;
}

function appendLog(state, { action, resourceType, resourceId, actorId, clinicId, detail }) {
  state.audit.unshift({
    id: makeId("evt"),
    action,
    resourceType,
    resourceId,
    actorId,
    clinicId: clinicId ?? null,
    detail: detail ?? "",
    at: new Date().toISOString(),
  });
  state.audit = state.audit.slice(0, 200);
}

export function createPatient(state, input, actor) {
  const name = requireText(input.name, "Imię zwierzęcia", 100);
  const ownerName = requireText(input.ownerName, "Opiekun", 150);
  const species = requireText(input.species, "Gatunek", 30);
  if (!["Pies", "Kot", "Inne"].includes(species)) throw new Error("Wybierz poprawny gatunek.");
  validateDate(input.birthDate, "Data urodzenia");
  const chip = String(input.microchip ?? "").trim();
  if (chip && !/^\d{15}$/.test(chip)) throw new Error("Numer mikrochipu musi mieć 15 cyfr.");
  if (chip && state.pets.some((pet) => pet.microchip === chip)) throw new Error("Ten mikrochip jest już zapisany w demonstracji.");

  let owner = state.owners.find((item) => item.name.toLocaleLowerCase("pl") === ownerName.toLocaleLowerCase("pl"));
  if (!owner) {
    owner = { id: makeId("owner"), name: ownerName, email: "", status: "demo_verified" };
    state.owners.push(owner);
  }
  const pet = {
    id: makeId("pet"),
    petId: petIdFor(state),
    name,
    species,
    breed: String(input.breed ?? "").trim(),
    birthDate: input.birthDate || "",
    microchip: chip,
    status: "active",
    clinicIds: [actor.clinicId],
    createdAt: new Date().toISOString(),
    source: "clinic_authored",
    verification: "verified_demo",
  };
  state.pets.unshift(pet);
  state.petOwners.push({ id: makeId("rel"), petId: pet.id, ownerId: owner.id, relationship: "primary_carer", status: "verified_demo" });
  appendLog(state, { action: "patient.created", resourceType: "pet", resourceId: pet.id, actorId: actor.id, clinicId: actor.clinicId, detail: "Wpis demonstracyjny" });
  return pet;
}

export function createVisit(state, input, actor) {
  const pet = state.pets.find((item) => item.id === input.petId && item.clinicIds.includes(actor.clinicId));
  if (!pet) throw new Error("Wybierz pacjenta tej kliniki.");
  validateDate(input.eventAt, "Data wizyty");
  const visit = {
    id: makeId("visit"),
    petId: pet.id,
    clinicId: actor.clinicId,
    type: requireText(input.type, "Typ wizyty", 80),
    eventAt: input.eventAt || new Date().toISOString().slice(0, 10),
    notes: requireText(input.notes, "Notatka", 4000),
    status: VISIT_STATUS.DRAFT,
    source: "clinic_authored",
    authorId: actor.id,
    createdAt: new Date().toISOString(),
    signedAt: null,
    version: 1,
    amendments: [],
    ownerVisible: Boolean(input.ownerVisible),
  };
  state.visits.unshift(visit);
  appendLog(state, { action: "visit.draft_created", resourceType: "visit", resourceId: visit.id, actorId: actor.id, clinicId: actor.clinicId });
  return visit;
}

export function signVisit(state, visitId, actor) {
  const visit = state.visits.find((item) => item.id === visitId && item.clinicId === actor.clinicId);
  if (!visit) throw new Error("Nie znaleziono wizyty tej kliniki.");
  if (actor.role !== "veterinarian" || actor.status !== "active") throw new Error("Zatwierdzenie wymaga aktywnego konta lekarza weterynarii.");
  if (visit.status !== VISIT_STATUS.DRAFT) throw new Error("Wizyta nie jest szkicem.");
  visit.status = VISIT_STATUS.SIGNED;
  visit.signedAt = new Date().toISOString();
  visit.signedBy = actor.id;
  visit.version += 1;
  appendLog(state, { action: "visit.signed", resourceType: "visit", resourceId: visit.id, actorId: actor.id, clinicId: actor.clinicId });
  return visit;
}

export function amendVisit(state, visitId, input, actor) {
  const visit = state.visits.find((item) => item.id === visitId && item.clinicId === actor.clinicId);
  if (!visit || visit.status !== VISIT_STATUS.SIGNED) throw new Error("Korekta wymaga zatwierdzonej wizyty tej kliniki.");
  if (actor.role !== "veterinarian" || actor.status !== "active") throw new Error("Korektę może dodać aktywne konto lekarza weterynarii.");
  const reason = requireText(input.reason, "Powód korekty", 500);
  if (reason.length < 10) throw new Error("Powód korekty musi mieć co najmniej 10 znaków.");
  const note = requireText(input.notes, "Treść sprostowania", 4000);
  const amendment = { id: makeId("amendment"), reason, notes: note, authorId: actor.id, createdAt: new Date().toISOString() };
  visit.amendments.push(amendment);
  visit.version += 1;
  appendLog(state, { action: "visit.amended", resourceType: "visit", resourceId: visit.id, actorId: actor.id, clinicId: actor.clinicId, detail: reason });
  return amendment;
}

export function createDocument(state, input, actor) {
  const pet = state.pets.find((item) => item.id === input.petId && item.clinicIds.includes(actor.clinicId));
  if (!pet) throw new Error("Wybierz pacjenta tej kliniki.");
  const source = requireText(input.source, "Źródło", 60);
  if (!DOCUMENT_SOURCES.includes(source)) throw new Error("Nieznany typ źródła.");
  validateDate(input.eventAt, "Data dokumentu");
  const document = {
    id: makeId("doc"),
    petId: pet.id,
    clinicId: actor.clinicId,
    title: requireText(input.title, "Nazwa dokumentu", 180),
    kind: requireText(input.kind, "Typ dokumentu", 60),
    eventAt: input.eventAt || new Date().toISOString().slice(0, 10),
    source,
    verification: source === "clinic_authored" || source === "external_verified" ? "verified_demo" : "unverified",
    ownerVisible: Boolean(input.ownerVisible) && source !== "ai_extracted_unverified",
    authorId: actor.id,
    createdAt: new Date().toISOString(),
    fileAttached: false,
  };
  state.documents.unshift(document);
  appendLog(state, { action: "document.metadata_created", resourceType: "document", resourceId: document.id, actorId: actor.id, clinicId: actor.clinicId });
  return document;
}

export function createCareRecord(state, collection, input, actor) {
  if (!(["vaccinations", "treatments"].includes(collection))) throw new Error("Nieobsługiwany rodzaj wpisu.");
  const pet = state.pets.find((item) => item.id === input.petId && item.clinicIds.includes(actor.clinicId));
  if (!pet) throw new Error("Wybierz pacjenta tej kliniki.");
  validateDate(input.eventAt, "Data wpisu");
  const record = {
    id: makeId(collection === "vaccinations" ? "vax" : "care"),
    petId: pet.id,
    clinicId: actor.clinicId,
    title: requireText(input.title, collection === "vaccinations" ? "Preparat" : "Leczenie", 180),
    details: String(input.details ?? "").trim(),
    eventAt: input.eventAt || new Date().toISOString().slice(0, 10),
    source: "clinic_authored",
    verification: "verified_demo",
    authorId: actor.id,
    createdAt: new Date().toISOString(),
    nextDate: input.nextDate || "",
  };
  if (collection === "vaccinations" && record.nextDate) {
    validateDate(record.nextDate, "Kolejny termin");
    if (record.nextDate < record.eventAt) throw new Error("Kolejny termin nie może poprzedzać daty szczepienia.");
  }
  state[collection].unshift(record);
  appendLog(state, { action: `${collection}.created`, resourceType: collection, resourceId: record.id, actorId: actor.id, clinicId: actor.clinicId });
  return record;
}

export function createDocumentRequest(state, input, actor) {
  const pet = state.pets.find((item) => item.id === input.petId);
  const relation = state.petOwners.find((item) => item.petId === pet?.id && item.ownerId === actor.ownerId && item.status === "verified_demo");
  if (!pet || !relation) throw new Error("Brak zweryfikowanego powiązania w demonstracji.");
  const request = {
    id: makeId("request"),
    petId: pet.id,
    ownerId: actor.ownerId,
    scope: requireText(input.scope, "Zakres wniosku", 240),
    status: "submitted_demo",
    createdAt: new Date().toISOString(),
  };
  state.documentRequests.unshift(request);
  appendLog(state, { action: "document_request.submitted", resourceType: "document_request", resourceId: request.id, actorId: actor.id, detail: "Wymaga ręcznej weryfikacji; niczego nie udostępniono automatycznie." });
  return request;
}

export function getOwnerHistory(state, ownerId) {
  const petIds = new Set(state.petOwners.filter((item) => item.ownerId === ownerId && item.status === "verified_demo").map((item) => item.petId));
  const pets = state.pets.filter((pet) => petIds.has(pet.id));
  const visiblePetIds = new Set(pets.map((pet) => pet.id));
  return {
    pets,
    visits: state.visits.filter((visit) => visiblePetIds.has(visit.petId) && visit.ownerVisible && visit.status === VISIT_STATUS.SIGNED),
    documents: state.documents.filter((doc) => visiblePetIds.has(doc.petId) && doc.ownerVisible && doc.verification === "verified_demo"),
    vaccinations: state.vaccinations.filter((record) => visiblePetIds.has(record.petId)),
  };
}
