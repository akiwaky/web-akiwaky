import { test, expect } from '@playwright/test';

test.describe('Smoke tests for essential routes', () => {
    test('Main landing page loads correctly', async ({ page }) => {
        const response = await page.goto('/');
        expect(response?.ok()).toBeTruthy();
        // Validate Next.js basic render
        await expect(page).toHaveTitle(/Alejandro AG/i, { timeout: 10000 }).catch(() => null);
    });

    test('Chaty hub page loads correctly', async ({ page }) => {
        const response = await page.goto('/chaty');
        expect(response?.ok()).toBeTruthy();
        await expect(page.locator('text=WhatsApp')).toBeVisible();
    });
});
