# Restauracja Smaku

Projekt strony restauracji przygotowany w React i Vite.

Pierwsza konfiguracja Firebase została opisana krok po kroku w
[FIREBASE_SETUP.md](FIREBASE_SETUP.md). Instrukcja obejmuje emulatory bez
konta Google oraz konfigurację prawdziwego projektu Firebase.

## Uruchomienie

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Po uruchomieniu aplikacja jest dostepna lokalnie pod adresem pokazanym w terminalu, domyslnie:

```text
http://127.0.0.1:5173/
```

## Przydatne komendy

```powershell
npm run build
npm run lint
npm test
npm run test:rules
npm run emulators
```

## Firebase

Uzupełnij `.env` danymi dedykowanego projektu deweloperskiego Firebase. Do
pracy wyłącznie na emulatorach ustaw `VITE_USE_FIREBASE_EMULATORS=true`.
Firestore Emulator używa portu `8085`, ponieważ standardowy port `8080`
może być zajęty przez lokalne usługi.

Firebase Emulator wymaga JDK 21. Skrypty `test:rules` i `emulators`
automatycznie wybierają lokalne JDK 21 na Windows, jeśli domyślny `java`
wskazuje starszą wersję.

W Firebase Authentication włącz tylko Email/Password. W ustawieniach Identity
Platform wyłącz tworzenie i usuwanie kont przez użytkowników końcowych, włącz
ochronę przed enumeracją adresów oraz ustaw hasła na minimum 12 znaków z małą
i wielką literą, cyfrą i znakiem specjalnym.

Konta pracowników tworzy administrator w Firebase Console. Dostęp do panelu
wymaga dokumentu `staff/{uid}` z polami `email`, `displayName` i `createdAt`.
Aplikacja nie ma funkcji rejestracji ani nadawania uprawnień.

Projekt jest demonstracją. Publicznego formularza nie należy łączyć z realnymi
danymi klientów bez App Check/reCAPTCHA lub backendowego limitowania żądań,
monitoringu kosztów i ustalonej retencji danych.

### Raport Google Analytics w czasie rzeczywistym na zdeployowanej aplikacji na vercelu:
![Panel Real-time Google Analytics](./googleanalytics.png)
![Panel Real-time Google Analytics](./googleanalytics2.png)
