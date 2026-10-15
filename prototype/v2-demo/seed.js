export const STORAGE_KEY = "petid.prototype.v2.demo";
export const RECOVERY_PREFIX = `${STORAGE_KEY}.recovered.`;

export function createSeed() {
  const clinicId = "clinic-demo-001";
  const vetId = "user-demo-vet";
  const ownerAnna = "owner-demo-anna";
  const ownerMarek = "owner-demo-marek";
  const petRex = "pet-demo-rex";
  const petLuna = "pet-demo-luna";
  const petFiga = "pet-demo-figa";
  return {
    version: 1,
    clinic: { id: clinicId, name: "Zielona Łapa · klinika demonstracyjna", city: "Gdańsk", phone: "+48 500 000 000", email: "demo@petid.example", status: "pilot_demo" },
    clinics: [
      { id: clinicId, name: "Zielona Łapa · klinika demonstracyjna", city: "Gdańsk", status: "pilot_demo", patients: 3, members: 3 },
      { id: "clinic-demo-002", name: "Przychodnia Nadmorska · demo", city: "Koszalin", status: "invited_demo", patients: 1, members: 2 },
    ],
    users: [
      { id: vetId, name: "dr Anna Kowalska", email: "anna@example.test", role: "veterinarian", status: "active", clinicId },
      { id: "user-demo-reception", name: "Marta Nowak", email: "marta@example.test", role: "receptionist", status: "active", clinicId },
      { id: "user-demo-admin", name: "Piotr Zieliński", email: "piotr@example.test", role: "clinic_admin", status: "active", clinicId },
    ],
    owners: [
      { id: ownerAnna, name: "Anna Kowalska", email: "anna.owner@example.test", status: "demo_verified" },
      { id: ownerMarek, name: "Marek Wiśniewski", email: "marek.owner@example.test", status: "demo_verified" },
    ],
    petOwners: [
      { id: "rel-demo-1", petId: petRex, ownerId: ownerAnna, relationship: "primary_carer", status: "verified_demo" },
      { id: "rel-demo-2", petId: petLuna, ownerId: ownerAnna, relationship: "primary_carer", status: "verified_demo" },
      { id: "rel-demo-3", petId: petFiga, ownerId: ownerMarek, relationship: "primary_carer", status: "verified_demo" },
    ],
    pets: [
      { id: petRex, petId: "PET-5D2F8A11", name: "Rex", species: "Pies", breed: "Labrador", birthDate: "2019-04-12", microchip: "616000000000001", status: "active", clinicIds: [clinicId], createdAt: "2026-09-12T08:30:00.000Z", source: "clinic_authored", verification: "verified_demo" },
      { id: petLuna, petId: "PET-91A0C7E2", name: "Luna", species: "Kot", breed: "Brytyjski krótkowłosy", birthDate: "2021-06-08", microchip: "616000000000002", status: "active", clinicIds: [clinicId], createdAt: "2026-09-18T10:15:00.000Z", source: "clinic_authored", verification: "verified_demo" },
      { id: petFiga, petId: "PET-32B89D40", name: "Figa", species: "Kot", breed: "Europejski", birthDate: "2022-03-16", microchip: "", status: "active", clinicIds: [clinicId], createdAt: "2026-10-02T11:40:00.000Z", source: "clinic_authored", verification: "verified_demo" },
    ],
    visits: [
      { id: "visit-demo-1", petId: petRex, clinicId, type: "Kontrola po leczeniu", eventAt: "2026-10-13", notes: "Samopoczucie dobre. Kontynuować obserwację.", status: "signed", source: "clinic_authored", authorId: vetId, createdAt: "2026-10-13T09:20:00.000Z", signedAt: "2026-10-13T09:24:00.000Z", signedBy: vetId, version: 1, amendments: [], ownerVisible: true },
      { id: "visit-demo-2", petId: petLuna, clinicId, type: "Konsultacja", eventAt: "2026-10-12", notes: "Rutynowa konsultacja. Bez niepokojących objawów.", status: "signed", source: "clinic_authored", authorId: vetId, createdAt: "2026-10-12T12:05:00.000Z", signedAt: "2026-10-12T12:12:00.000Z", signedBy: vetId, version: 1, amendments: [], ownerVisible: true },
      { id: "visit-demo-3", petId: petRex, clinicId, type: "Wizyta kontrolna", eventAt: "2026-10-15", notes: "Wyniki badań do omówienia.", status: "draft", source: "clinic_authored", authorId: vetId, createdAt: "2026-10-15T08:10:00.000Z", signedAt: null, version: 1, amendments: [], ownerVisible: false },
    ],
    documents: [
      { id: "doc-demo-1", petId: petRex, clinicId, title: "Morfologia — kontrola", kind: "Wynik badania", eventAt: "2026-10-13", source: "clinic_authored", verification: "verified_demo", ownerVisible: true, authorId: vetId, createdAt: "2026-10-13T09:18:00.000Z", fileAttached: false },
      { id: "doc-demo-2", petId: petLuna, clinicId, title: "Karta konsultacji", kind: "Karta wizyty", eventAt: "2026-10-12", source: "clinic_authored", verification: "verified_demo", ownerVisible: true, authorId: vetId, createdAt: "2026-10-12T12:00:00.000Z", fileAttached: false },
      { id: "doc-demo-3", petId: petRex, clinicId, title: "Zdjęcie opatrunku", kind: "Załącznik", eventAt: "2026-10-14", source: "owner_supplied", verification: "unverified", ownerVisible: false, authorId: ownerAnna, createdAt: "2026-10-14T17:30:00.000Z", fileAttached: false },
    ],
    vaccinations: [
      { id: "vax-demo-1", petId: petRex, clinicId, title: "Wścieklizna", details: "Preparat demonstracyjny", eventAt: "2026-03-12", nextDate: "2027-03-12", source: "clinic_authored", verification: "verified_demo", authorId: vetId, createdAt: "2026-03-12T10:00:00.000Z" },
      { id: "vax-demo-2", petId: petLuna, clinicId, title: "Szczepienie podstawowe", details: "", eventAt: "2026-06-05", nextDate: "2027-06-05", source: "clinic_authored", verification: "verified_demo", authorId: vetId, createdAt: "2026-06-05T10:00:00.000Z" },
    ],
    treatments: [
      { id: "care-demo-1", petId: petRex, clinicId, title: "Kontynuacja obserwacji", details: "Według zaleceń lekarza", eventAt: "2026-10-13", nextDate: "", source: "clinic_authored", verification: "verified_demo", authorId: vetId, createdAt: "2026-10-13T09:25:00.000Z" },
    ],
    documentRequests: [
      { id: "request-demo-1", petId: petRex, ownerId: ownerAnna, scope: "Dokumentacja wizyt za 2026 rok", status: "in_review_demo", createdAt: "2026-10-14T14:00:00.000Z" },
    ],
    invitations: [],
    audit: [
      { id: "evt-demo-1", action: "visit.signed", resourceType: "visit", resourceId: "visit-demo-1", actorId: vetId, clinicId, detail: "Zdarzenie demonstracyjne", at: "2026-10-13T09:24:00.000Z" },
      { id: "evt-demo-2", action: "document.metadata_created", resourceType: "document", resourceId: "doc-demo-1", actorId: vetId, clinicId, detail: "Zdarzenie demonstracyjne", at: "2026-10-13T09:18:00.000Z" },
      { id: "evt-demo-3", action: "owner_relation.verified_demo", resourceType: "pet_owner", resourceId: "rel-demo-1", actorId: "user-demo-admin", clinicId, detail: "Dane testowe — bez weryfikacji prawnej", at: "2026-09-12T08:45:00.000Z" },
    ],
  };
}
