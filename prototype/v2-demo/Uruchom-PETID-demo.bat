@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Nie znaleziono Node.js.
  echo Zainstaluj Node.js w wersji 20 lub nowszej, a potem uruchom ten plik ponownie.
  echo Pobieraj instalator wyłącznie z https://nodejs.org/
  pause
  exit /b 1
)

echo Uruchamiam PETID — prototyp demonstracyjny.
echo Otworzy sie osobne okno serwera. Nie zamykaj go podczas korzystania z prototypu.
start "PETID Demo Server" /D "%~dp0" cmd /k node serve-demo.mjs
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:4173
echo Aby zatrzymac serwer, zamknij okno "PETID Demo Server".
pause
