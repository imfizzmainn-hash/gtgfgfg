# PETID v1.10 — przewodnik audytu zewnętrznego

## Zakres
To **lokalny prototyp demonstracyjny** z trzema panelami i 22 trasami. Kod aplikacji znajduje się w `index.html`, `js/`, `css/`. Poprzednia generacja projektu pozostaje w `legacy-v1.8.5/`. Nie ma migracji danych pomiędzy generacjami.

## Uruchomienie
1. Rozpakuj ZIP.
2. Uruchom lokalny serwer statyczny, np. `python -m http.server 8000` w katalogu projektu.
3. Otwórz `http://localhost:8000/`.
4. Testy: `node --test tests/*.test.cjs`.
5. Nie używaj prawdziwych danych medycznych ani osobowych.

## Poproś audytora o
1. Statyczną analizę bezpieczeństwa JS/HTML, XSS, integralności, race conditions i walidacji.
2. Testy E2E w Chromium, Firefox i WebKit; test dwóch kart i quota/localStorage corruption.
3. Weryfikację wszystkich 22 tras i przepływów klinika → właściciel → administrator.
4. Kontrolę integralności ZIP i SHA256.
5. Oddzielenie błędów potwierdzonych od hipotez oraz dołączenie reprodukcji i rekomendowanych poprawek.
6. Analizę docelowego schematu PostgreSQL, RLS, kontroli uprawnień, audytu, zgód i modelu klinik.
7. Sprawdzenie, czy moduły demonstracyjne nie sprawiają wrażenia produkcyjnych.

## Krytyczne ograniczenia znane przed audytem
- Brak serwera, uwierzytelniania, rzeczywistych uprawnień, RLS i bezpiecznego magazynu plików.
- Każdy użytkownik tej samej przeglądarki może przełączyć panele i wybrać dowolne zwierzę.
- `localStorage` nie zapewnia transakcyjności między kartami; kontrola rewizji nie jest atomowym compare-and-swap.
- Audyt jest lokalny, edytowalny i nie ma prawdziwego aktora.
- Nie ma podpisywania wizyt w nowej architekturze; wizyty pozostają projektami.
- Dokumenty w nowej architekturze są tylko metadanymi; niepowiązane dokumenty mogą być widoczne w demonstracyjnym panelu właściciela.
- Legacy v1.8.5 nie zostało przepisane ani ponownie audytowane.
- Nie ma działających agentów AI ani OCR.
- Eksport JSON to surowa kopia, nie bezpieczny backup.

## Oczekiwany format raportu
`ID | Priorytet P0/P1/P2/P3 | Plik:linia | Reprodukcja | Wpływ | Propozycja naprawy | Test regresji`.
