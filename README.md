# MetaPeek Frontend

A responsive React + Bootstrap web interface for uploading video files and visualizing extracted metadata.

This frontend integrates with a Go-based API backend that handles metadata extraction using FFmpeg/ffprobe.

---

## 🚀 Features

- File picker upload interface
- Real-time JSON metadata display (duration, codec, dimensions, etc.)
- Upload file size limits enforced via backend (currently 10 MiB max) --**will be adjusted as the project matures**--
- Fully automated End-to-End (E2E) testing with Playwright
- Component-level unit testing with Vitest and React Testing Library
- Built with Vite, React, TypeScript, and Bootstrap 5

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| UI Framework | React |
| Build System | Vite |
| Styling | Bootstrap 5 |
| Language | TypeScript |
| Testing | Playwright (E2E), Vitest + React Testing Library (unit) |
| Backend | Go (FFmpeg/ffprobe extraction API - separate repo) |

---

## 🛠️ Setup Instructions

 1️⃣ Clone the repo

```bash
git clone https://github.com/Vince33/metapeek.git
cd metapeek
```

 2️⃣ Install dependencies
```
npm install
```

 3️⃣ Start the frontend dev server
```
npm run dev
```

 The app will be available at:
```
http://localhost:5173/
```
 ⚠ The Go backend must be running separately for full functionality.


## 🔬 End-to-End Testing (Playwright)


### Running E2E tests
```
npm run test:e2e
```
Note:
 - Playwright will automatically start the Vite dev server.
 - Tests are organized by page/feature, then by purpose within that page
   (e.g. `playwright/tests/upload/happy-path.spec.ts` and
   `playwright/tests/upload/validation.spec.ts`).
 - Fixtures (test files) live under: playwright/fixtures/
 - In CI, the real Go backend (media-metadata-api) is checked out and
   started alongside the frontend — these are true end-to-end tests
   against the real backend in both local and CI environments, not mocked
   API responses.



### Debugging tests interactively
```
npx playwright test --debug
```
 Highly recommend setting up your text editor or IDE for testing. For example playwright plugin with VScode. This will also grant you the ability to run test from within the IDE test explorer. However this is beyond the scope of this setup as it is dev env dependent. 

## 🧪 Unit Testing (Vitest + React Testing Library)

Component-level unit tests cover `UploadForm`'s core logic — no file
selected, successful upload, both branches of error handling, and the
Clear button's reset behavior — without requiring a browser or a
running backend. The `extractMetadata` API call is mocked at the module
level, so these tests run in well under a second.

This is a deliberately different layer from the Playwright E2E suite: unit
tests verify the frontend's own decision logic in isolation, while E2E tests
verify the frontend and the real Go backend work correctly together.

### Running unit tests
```
npm run test:unit
```

### Running with coverage
```
npx vitest run --coverage
```

Note:
 - Test files live alongside the components they test, using a `.test.tsx` suffix (e.g. `src/components/UploadForm.test.tsx`).
 - The `extractMetadata` API module is mocked in these tests; it is intentionally not exercised here. Real API behavior is covered by the Playwright E2E suite instead.

## 🧪 Test ID Strategy
 - We use data-testid attributes on key DOM elements to stabilize E2E tests.
 - This approach avoids brittle selectors tied to class names or layout structure.


### Example frontend usage:
```
<div data-testid="metadata-output">
  Duration: 30s
</div>
```

### Example test usage:
```
await expect(page.getByTestId('metadata-output')).toContainText('Duration');
```

## 🎯 Fixtures Policy
 - Test media files live under: playwright/fixtures/
 - Fixtures should remain small (< 1MB) to avoid repository bloat.
 - Future fixture management may evolve as project grows.

## 🏗 Project Structure

```.
├── src/                   # Frontend React app source
│   └── components/        # React components, with co-located .test.tsx unit tests
├── playwright.config.ts   # Playwright E2E config (project root)
├── playwright/
│   ├── tests/
│   │   └── upload/        # Tests organized by page/feature, then by purpose
│   │       ├── happy-path.spec.ts
│   │       └── validation.spec.ts
│   └── fixtures/          # Test media files
├── package.json           # Project dependencies & scripts
└── vite.config.ts         # Vite build config (includes Vitest config)
```

## 🚧 Known Requirements
 - Running backend API (Go + ffprobe) must be active for full file upload flows.
 - Backend is responsible for actual file size enforcement & metadata extraction.
 - Max upload size currently set to 10 MiB at API level. ** This will adjust as project matures **