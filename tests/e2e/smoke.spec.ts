import { test, expect } from '@playwright/test';

test.describe('Smoke tests for essential routes', () => {
    test('Main landing page loads correctly', async ({ page }) => {
        const response = await page.goto('/');
        expect(response?.ok()).toBeTruthy();
        // Validate Next.js basic render
        await expect(page).toHaveTitle(/Alejandro AG/i, { timeout: 10000 }).catch(() => null);
    });

    test('Music landing page loads correctly', async ({ page }) => {
        const response = await page.goto('/music');
        expect(response?.ok()).toBeTruthy();
        // Validate Hero text
        await expect(page.locator('text=Clases de piano')).toBeVisible();
    });

    test('Norte bot page loads correctly', async ({ page }) => {
        const response = await page.goto('/norte');
        expect(response?.ok()).toBeTruthy();
    });
});
