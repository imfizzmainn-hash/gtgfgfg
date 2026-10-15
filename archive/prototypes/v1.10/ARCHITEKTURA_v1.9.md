# PETID v1.9 — architektura szkieletu

- 3 panele, 22 widoki zdefiniowane w `js/routes.js`.
- Widoki v1.9 to nawigowalny **szkielet**, nie funkcjonalne CRUD.
- Dotychczasowy prototyp v1.8.5 jest zachowany w `legacy-v1.8.5/` bez ingerencji w kod.
- Nie ma jeszcze integracji danych między nowym szkieletem a starszym prototypem.
- Kolejny krok: przenoszenie modułów do wspólnego modelu danych i routera, jeden po drugim, z testami regresji.
- Przed rzeczywistymi danymi: backend, uwierzytelnianie, RLS, zgody, audyt, kopie zapasowe, testy bezpieczeństwa i ocena RODO.
- Agenci AI: tylko punkty integracji, bez prawdziwych usług.
