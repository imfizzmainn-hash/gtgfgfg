# PETID — klikalny prototyp v2.0

Samodzielny prototyp przeglądarkowy przygotowany na podstawie `docs/MASTER_SPEC_v4.0.md`. Zawiera wyłącznie fikcyjne dane demonstracyjne.

## Uruchomienie

Wymagany Node.js 20 lub nowszy. Bez instalowania zależności:

```sh
cd prototype/v2-demo
npm test
npm run serve
```

Otwórz `http://127.0.0.1:4173`.

## Przepływy demonstracyjne

- Przełączanie między stroną publiczną, panelem kliniki, opiekuna i administratora platformy.
- Rejestracja pacjenta oraz karta pacjenta.
- Tworzenie szkicu wizyty, podpisanie przez symulowane konto lekarza i dodanie niezmiennej korekty.
- Dodawanie metadanych dokumentu z pochodzeniem, weryfikacją i widocznością.
- Rejestrowanie szczepień, terminów oraz wpisów leczenia.
- Złożenie lokalnego wniosku opiekuna; wniosek nie udostępnia automatycznie żadnych wpisów.
- Lokalne zaproszenie do zespołu, eksport danych JSON i przywrócenie zestawu demo.
- Kopia uszkodzonego lokalnego zapisu pod osobnym kluczem odzyskiwania; blokada zwykłych zapisów do czasu resetu.

## Granice prototypu

To nie jest wersja produkcyjna ani wdrożenie bezpieczne do użycia klinicznego. Role są przełącznikami widoków w przeglądarce, bez uwierzytelniania i autoryzacji po stronie serwera. Dane pozostają w `localStorage`; nie ma backendu, synchronizacji między urządzeniami, szyfrowania, bezpiecznego magazynu plików, wysyłki formularzy ani rzeczywistego zapraszania użytkowników. Prototyp nie obsługuje prawdziwych załączników i nie powinien otrzymywać danych osobowych ani dokumentacji medycznej.

Weryfikacja powiązania opiekuna, podpis elektroniczny, log audytowy i kontrola dostępu są tu modelami przepływów. W produkcie muszą być egzekwowane po stronie serwera oraz sprawdzone pod kątem prawnym i bezpieczeństwa.
