import { testUrls } from '@fixtures/Urls';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  reporter: [[`html`, {open: 'on-failure'}]],
  use: {
      baseURL: testUrls.docspaceBaseUrl,
      trace: 'retain-on-failure',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});