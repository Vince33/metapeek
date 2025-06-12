// import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   testDir: '../playwright/tests',
//   retries: 1,
//   use: {
//     headless: true,
//     baseURL: 'http://localhost:5173',  // Adjust to match your Vite dev URL
//   },
// });
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests',
  retries: 1,  // Feel free to adjust once tests stabilize
  use: {
    headless: false,
    baseURL: 'http://localhost:5173', // Ensure your Vite dev server runs here
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
});