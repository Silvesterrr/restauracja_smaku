# Firebase od zera - instrukcja dla początkującego

Ta aplikacja używa Firebase do:

- logowania pracowników przez e-mail i hasło,
- przechowywania rezerwacji w Cloud Firestore,
- sprawdzania, czy zalogowana osoba znajduje się w kolekcji `staff`.

Masz dwie możliwości:

1. **Emulatory lokalne** - bez konta Google, bez internetu i bez kosztów.
2. **Prawdziwy projekt Firebase** - wymaga zwykłego konta Google.

Najpierw wykonaj ścieżkę lokalną. Dopiero gdy wszystko działa, konfiguruj
projekt w chmurze.

## Część A: uruchomienie lokalne bez konta Firebase

### 1. Utwórz lokalny plik `.env`

W katalogu projektu uruchom:

```powershell
Copy-Item .env.example .env
```

Otwórz `.env` i ustaw:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_USE_FIREBASE_EMULATORS=true
VITE_FIRESTORE_EMULATOR_PORT=8085
```

Puste wartości Firebase są tutaj celowe. W trybie emulatorów prawdziwy projekt
nie jest potrzebny.

### 2. Uruchom emulatory

W pierwszym terminalu:

```powershell
npm run emulators
```

Nie zamykaj tego terminala. Powinny uruchomić się:

- panel emulatorów: `http://127.0.0.1:4000`,
- Authentication Emulator: port `9099`,
- Firestore Emulator: port `8085`.

### 3. Uruchom aplikację

W drugim terminalu:

```powershell
npm run dev
```

Otwórz adres pokazany przez Vite, zwykle:

```text
http://127.0.0.1:5173
```

### 4. Utwórz lokalne konto pracownika

1. Otwórz `http://127.0.0.1:4000`.
2. Wejdź do sekcji **Authentication**.
3. Kliknij **Add user**.
4. Podaj przykładowy e-mail, np. `pracownik@example.com`.
5. Ustaw hasło, np. `Testowe!Haslo123`.
6. Zapisz użytkownika.
7. Skopiuj jego **User UID**.

### 5. Nadaj użytkownikowi dostęp

Samo konto nie wystarcza. Aplikacja wymaga dokumentu `staff/{uid}`.

1. W panelu emulatorów wejdź do **Firestore**.
2. Kliknij **Start collection**.
3. Jako Collection ID wpisz dokładnie:

```text
staff
```

4. Jako Document ID wklej skopiowany **User UID**.
5. Dodaj pola:

| Pole | Typ | Przykładowa wartość |
|---|---|---|
| `email` | string | `pracownik@example.com` |
| `displayName` | string | `Jan Pracownik` |
| `createdAt` | timestamp | bieżąca data i godzina |

6. Zapisz dokument.

### 6. Sprawdź logowanie

1. Otwórz `http://127.0.0.1:5173/login`.
2. Zaloguj się utworzonym kontem.
3. Aplikacja powinna przekierować Cię do `/admin`.
4. Wyślij demonstracyjną rezerwację przez `/rezerwacje`.
5. Jeśli rezerwacja ma dzisiejszą datę, pojawi się w panelu pracownika.

Dane emulatorów są tymczasowe i znikają po jego wyczyszczeniu. To normalne.

## Część B: utworzenie prawdziwego projektu Firebase

### 1. Konto Google

Potrzebujesz zwykłego konta Google, np. konta Gmail. To konto będzie
administratorem projektu Firebase.

Zaloguj się na:

```text
https://console.firebase.google.com/
```

Dla bezpieczeństwa warto włączyć uwierzytelnianie dwuskładnikowe na koncie
Google.

### 2. Utwórz projekt

1. Kliknij **Create a project** albo **Add project**.
2. Nazwij projekt, np. `restauracja-smaku-dev`.
3. Sprawdź wygenerowany **Project ID**.
4. Project ID musi być unikalny i później nie można go zmienić.
5. Gemini in Firebase możesz wyłączyć.
6. Google Analytics również możesz wyłączyć - ten projekt go nie używa.
7. Kliknij **Create project**.

Na potrzeby projektu demonstracyjnego zostań na bezpłatnym planie **Spark**.
Nie musisz podawać karty. Nie wybieraj planu Blaze, jeśli nie masz konkretnego
powodu i nie rozumiesz jeszcze jego rozliczeń.

### 3. Zarejestruj aplikację webową

1. Na stronie głównej projektu kliknij ikonę aplikacji webowej `</>`.
2. Wpisz nazwę, np. `restauracja-smaku-web`.
3. Nie zaznaczaj teraz Firebase Hosting.
4. Kliknij **Register app**.
5. Firebase pokaże obiekt podobny do:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

Nie wklejaj tego obiektu do kodu. Wartości przepisz do lokalnego `.env`:

```text
VITE_FIREBASE_API_KEY=wartosc_apiKey
VITE_FIREBASE_AUTH_DOMAIN=wartosc_authDomain
VITE_FIREBASE_PROJECT_ID=wartosc_projectId
VITE_FIREBASE_STORAGE_BUCKET=wartosc_storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=wartosc_messagingSenderId
VITE_FIREBASE_APP_ID=wartosc_appId

VITE_USE_FIREBASE_EMULATORS=false
VITE_FIRESTORE_EMULATOR_PORT=8085
```

Nie dodawaj `.env` do Gita. Repozytorium ignoruje ten plik.

Konfiguracja aplikacji webowej Firebase nie jest hasłem ani kluczem
administratora. Bezpieczeństwo danych zapewniają reguły Firestore.

## Część C: konfiguracja Authentication

### 1. Włącz logowanie e-mail i hasłem

1. W Firebase Console otwórz **Build -> Authentication**.
2. Kliknij **Get started**.
3. Wejdź w **Sign-in method**.
4. Wybierz **Email/Password**.
5. Włącz pierwszy przełącznik **Email/Password**.
6. Nie włączaj **Email link**.
7. Zapisz ustawienia.

Nie włączaj Google, Anonymous ani innych providerów.

### 2. Włącz Firebase Authentication with Identity Platform

W **Authentication -> Settings** może pojawić się opcja aktualizacji do
**Firebase Authentication with Identity Platform**.

Wykonaj aktualizację, ponieważ projekt wymaga blokady samodzielnego tworzenia
i usuwania kont przez użytkowników. Aktualizacja nie wymaga zmiany kodu
aplikacji. Na planie Spark obowiązuje limit 3000 aktywnych użytkowników
dziennie, co dla tej demonstracji jest więcej niż wystarczające.

Przed potwierdzeniem upewnij się, że konsola nadal pokazuje plan **Spark** i
nie prosi o podłączenie płatnego konta rozliczeniowego.

### 3. Zablokuj samodzielne tworzenie i usuwanie kont

1. Wejdź w **Authentication -> Settings**.
2. Otwórz sekcję **User account management**.
3. Wybierz **User actions**.
4. Wyłącz możliwość tworzenia kont przez użytkowników końcowych.
5. Wyłącz możliwość usuwania kont przez użytkowników końcowych.
6. Zapisz.

Po tej zmianie konta może tworzyć administrator w konsoli, ale formularz lub
API użyte przez zwykłego użytkownika powinny zwracać
`auth/admin-restricted-operation`.

### 4. Sprawdź ochronę przed sprawdzaniem adresów e-mail

W tym samym miejscu:

1. Otwórz **Authentication -> Settings**.
2. Przejdź do **User account management -> User actions**.
3. Upewnij się, że **Email enumeration protection** jest włączone.

W nowych projektach utworzonych po 15 września 2023 ta ochrona powinna być
domyślnie aktywna.

### 5. Ustaw politykę haseł

1. Otwórz **Authentication -> Settings**.
2. Znajdź **Password policy**.
3. Wybierz tryb **Require**.
4. Ustaw minimum 12 znaków.
5. Wymagaj:
   - małej litery,
   - wielkiej litery,
   - cyfry,
   - znaku specjalnego.
6. Zapisz.

## Część D: utworzenie bazy Cloud Firestore

1. W Firebase Console wybierz **Build -> Firestore Database**.
2. Kliknij **Create database**.
3. Wybierz bazę `(default)` w trybie **Native mode**, jeśli konsola o to pyta.
4. Wybierz lokalizację `europe-central2 (Warsaw)`.
5. Lokalizacji nie można później zmienić.
6. Wybierz **Production mode**.
7. Kliknij **Create**.

Nie wybieraj Test mode. Test mode tymczasowo pozwala obcym osobom czytać lub
zapisywać dane.

## Część E: wysłanie reguł i indeksu do Firebase

Projekt ma już pliki:

- `firebase.json`,
- `firestore.rules`,
- `firestore.indexes.json`.

### 1. Zaloguj Firebase CLI

W terminalu, w katalogu repozytorium:

```powershell
npx firebase login
```

Otworzy się przeglądarka. Zaloguj się tym samym kontem Google, które utworzyło
projekt.

### 2. Połącz repozytorium z projektem

Najpierw znajdź Project ID w:

```text
Firebase Console -> Project settings -> General
```

Następnie uruchom:

```powershell
npx firebase use --add
```

1. Wybierz utworzony projekt.
2. Jako alias wpisz:

```text
dev
```

Powstanie plik `.firebaserc`. Można go dodać do repozytorium, ponieważ zawiera
tylko identyfikator projektu, a nie hasła.

### 3. Wyślij reguły i indeks

```powershell
npx firebase deploy --only firestore
```

To polecenie nadpisze reguły Firestore w konsoli regułami z repozytorium i
utworzy wymagany indeks.

Po udanym wdrożeniu sprawdź:

```text
Firestore Database -> Rules
Firestore Database -> Indexes
```

## Część F: utworzenie pierwszego prawdziwego pracownika

### 1. Utwórz konto Authentication

1. Otwórz **Build -> Authentication -> Users**.
2. Kliknij **Add user**.
3. Wpisz służbowy lub demonstracyjny e-mail.
4. Ustaw silne hasło zgodne z polityką.
5. Zapisz.
6. Skopiuj **User UID**.

Nie twórz pracownika przez aplikację. Nie ma i nie powinno być publicznego
formularza rejestracji.

### 2. Dodaj dokument `staff`

1. Otwórz **Build -> Firestore Database -> Data**.
2. Kliknij **Start collection**.
3. Collection ID:

```text
staff
```

4. Document ID: wklej dokładnie UID użytkownika z Authentication.
5. Dodaj pola:

| Pole | Typ | Przykładowa wartość |
|---|---|---|
| `email` | string | e-mail konta Authentication |
| `displayName` | string | `Jan Pracownik` |
| `createdAt` | timestamp | bieżąca data i godzina |

6. Zapisz dokument.

Najczęstszy błąd: użycie automatycznego Document ID. ID dokumentu musi być
identyczne z UID użytkownika.

## Część G: końcowy test

1. Upewnij się, że w `.env` jest:

```text
VITE_USE_FIREBASE_EMULATORS=false
```

2. Zatrzymaj i ponownie uruchom Vite:

```powershell
npm run dev
```

3. Otwórz `/login`.
4. Zaloguj się utworzonym pracownikiem.
5. Sprawdź, czy widzisz `/admin`.
6. Wyloguj się i spróbuj wejść bezpośrednio na `/admin`.
7. Aplikacja powinna przenieść Cię do `/login`.
8. Wyślij demonstracyjną rezerwację przez `/rezerwacje`.
9. Rezerwacja na dzisiaj powinna pojawić się w panelu.

## Część H: typowe problemy

### `Brak konfiguracji Firebase`

Sprawdź `.env`, a następnie uruchom ponownie `npm run dev`. Vite czyta zmienne
środowiskowe podczas startu.

### Logowanie działa, ale pojawia się `Brak dostępu`

Konto istnieje w Authentication, ale brakuje dokumentu `staff/{uid}` albo jego
Document ID nie jest identyczne z UID.

### `Missing or insufficient permissions`

Najczęstsze powody:

- reguły nie zostały wdrożone,
- zalogowany użytkownik nie ma dokumentu `staff/{uid}`,
- aplikacja łączy się z innym Project ID niż Firebase CLI.

### Panel nie pokazuje rezerwacji

Panel pokazuje wyłącznie rezerwacje na dzisiejszą datę w strefie
`Europe/Warsaw`. Sprawdź pole `serviceDate`.

### Emulator nie startuje

Firebase Emulator wymaga JDK 21. Projekt ma skrypt, który automatycznie szuka
lokalnej instalacji JDK 21 na Windows. Firestore używa portu `8085`, ponieważ
port `8080` jest na tym komputerze zajęty przez inną usługę.

## Ważne ograniczenie

Obecna wersja służy do demonstracji i danych testowych. Nie podłączaj
publicznego formularza do prawdziwych danych klientów bez App Check lub
reCAPTCHA, limitowania żądań, monitoringu kosztów, polityki retencji i
informacji o przetwarzaniu danych.

## Oficjalna dokumentacja

- [Dodanie Firebase do aplikacji webowej](https://firebase.google.com/docs/web/setup)
- [Logowanie e-mail i hasłem](https://firebase.google.com/docs/auth/web/password-auth)
- [Firebase Authentication with Identity Platform](https://firebase.google.com/docs/auth)
- [Zarządzanie działaniami użytkowników](https://docs.cloud.google.com/identity-platform/docs/concepts-manage-users)
- [Ochrona przed enumeracją e-maili](https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection)
- [Tworzenie Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart)
- [Lokalizacje Cloud Firestore](https://firebase.google.com/docs/firestore/locations)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Plany cenowe Firebase](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans?hl=pl)
