# PETID — klikalny prototyp v2.0

Samodzielny prototyp przeglądarkowy przygotowany na podstawie `docs/MASTER_SPEC_v4.0.md`. Zawiera wyłącznie fikcyjne dane demonstracyjne.

## Uruchomienie

Wymagany Node.js 20 lub nowszy. Projekt nie wymaga instalowania dodatkowych pakietów.

### Windows 11

1. Pobierz ZIP gałęzi `prototype-v2-demo` z GitHub i rozpakuj go.
2. Otwórz folder `prototype/v2-demo`.
3. Dwukrotnie kliknij `Uruchom-PETID-demo.bat`.
4. Przeglądarka otworzy `http://127.0.0.1:4173`. Okno konsoli musi pozostać otwarte podczas korzystania z prototypu.
5. Zamknij okno konsoli, aby zatrzymać lokalny serwer.

Jeśli Windows zgłosi brak Node.js, zainstaluj wersję 20 lub nowszą ze strony [nodejs.org](https://nodejs.org/), a następnie ponownie uruchom plik `.bat`.

### Uruchomienie ręczne

```sh
cd prototype/v2-demo
npm test
npm run serve
```

Otwórz `http://127.0.0.1:4173`.

## Przepływy demonstracyjne

- Siedem stron informacyjnych: start, o PETID, dla klinik, dla opiekunów, jak działa, pilotaż oraz kontakt/FAQ.
- Przełączanie między stroną publiczną, panelem kliniki, opiekuna i administratora platformy.
- Rejestracja pacjenta oraz karta pacjenta.
- Tworzenie szkicu wizyty, podpisanie przez symulowane konto lekarza i dodanie niezmiennej korekty.
- Dodawanie metadanych dokumentu z pochodzeniem, weryfikacją i widocznością.
- Rejestrowanie szczepień, terminów oraz wpisów leczenia.
- Złożenie lokalnego wniosku opiekuna; wniosek nie udostępnia automatycznie żadnych wpisów.
- Lokalne zaproszenie do zespołu, eksport danych JSON i przywrócenie zestawu demo.
- Formularz testowy nie wysyła ani nie zapisuje wartości pól; rejestruje lokalnie wyłącznie fakt testu.
- Kopia uszkodzonego lokalnego zapisu pod osobnym kluczem odzyskiwania; blokada zwykłych zapisów do czasu resetu.

## Szybka ścieżka testowa

1. Wybierz obszar „Strona publiczna” i przejdź przez siedem zakładek.
2. Wybierz „Panel kliniki”, dodaj pacjenta i utwórz szkic wizyty.
3. Na liście wizyt podpisz szkic kontem lekarza. Następnie dopisz korektę i sprawdź, że pierwotna treść pozostała w historii.
4. Dodaj metadane dokumentu z pochodzeniem „Od opiekuna”; sprawdź, że wpis pozostaje niezweryfikowany.
5. Wybierz „Panel opiekuna”, przełącz przykładowe konto Anna/Marek i sprawdź zakres widocznych zwierząt. Złóż wniosek — wpis nie powinien sam ujawnić dokumentów.
6. Wybierz „Panel administratora” i sprawdź stan wniosków oraz dziennik zdarzeń.
7. Użyj „Przywróć dane demo”, aby wrócić do początkowego zestawu.

## Granice prototypu

To nie jest wersja produkcyjna ani wdrożenie bezpieczne do użycia klinicznego. Role są przełącznikami widoków w przeglądarce, bez uwierzytelniania i autoryzacji po stronie serwera. Dane pozostają w `localStorage`; nie ma backendu, synchronizacji między urządzeniami, szyfrowania, bezpiecznego magazynu plików, wysyłki formularzy ani rzeczywistego zapraszania użytkowników. Prototyp nie obsługuje prawdziwych załączników i nie powinien otrzymywać danych osobowych ani dokumentacji medycznej.

Weryfikacja powiązania opiekuna, podpis elektroniczny, log audytowy i kontrola dostępu są tu modelami przepływów. W produkcie muszą być egzekwowane po stronie serwera oraz sprawdzone pod kątem prawnym i bezpieczeństwa.
