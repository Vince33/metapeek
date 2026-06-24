import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import os from 'os';

test('shows an error when the uploaded file exceeds the size limit', async ({ page }) => {
  const oversizedFilePath = path.join(os.tmpdir(), 'oversized-test-file.mp4');
  const oversizedBuffer = Buffer.alloc(11 * 1024 * 1024);
  fs.writeFileSync(oversizedFilePath, oversizedBuffer);

  try {
    await page.goto('/');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(oversizedFilePath);
    await page.locator('button:has-text("Upload")').click();

    await expect(page.getByText('File size exceeds 10 MiB limit')).toBeVisible();
  } finally {
    fs.unlinkSync(oversizedFilePath);
  }
});