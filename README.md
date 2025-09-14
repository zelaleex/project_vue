# Vue 3 + Vite
## Projekt Nyilvántartó App

### Fő funkciók
- Projektek listázása, hozzáadása, szerkesztése, törlése
- Validáció, keresés, toast visszajelzések
- Adatok A böngésző LocalStorage-ban tárolva
- Mobilbarát, Bootstrap alapú reszponzív megjelenés
- Vue Router, Pinia
- Composable és utils mappák
- Újrafelhasználható komponensek: AppTextInput, ProjectTable
- Egységtesztek (Vitest)
- Docker támogatás

### Főbb mappák

- `src/components/` – UI komponensek (Navbar, ProjectForm, ProjectList, ProjectTable, AppTextInput, AppToast)
- `src/composables/` – logikai composable-ök (useFilters, useProjects, useProjectStorage, useToast,  useValidation)
- `src/utils/` – segédfüggvények (format, project)
- `src/stores/` – tárolók (projectStore, toastStore)
- `src/tests/` – egységtesztek (formValidation.test, projectService.test)

### Indítás fejlesztői módban

```bash
npm install
npm run dev
```

### Tesztek futtatása (Vitest)

```bash
npm run test
```

### Docker használata

```bash
docker build -t project-app .
docker run -p 5173:5173 project-app
```

### Fő útvonalak
- `/projects` – projektek listája
- `/projects/new` – új projekt hozzáadása
- `/projects/:id/edit` – projekt szerkesztése