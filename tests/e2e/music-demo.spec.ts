import { test, expect } from '@playwright/test';

test.describe('Music Subsite Interactive Demo', () => {
    test('Can navigate the music page and interact with FAQs', async ({ page }) => {
        // Go to the music landing page
        await page.goto('/music');

        // Check hero text
        await expect(page.locator('h1')).toContainText('Clases de piano');

        // Verify "Lo que dicen los alumnos" section is visible
        await expect(page.locator('text=Lo que dicen los alumnos')).toBeVisible();

        // 1. Test clicking a CTA (Agendar clase de prueba) - which are anchors or buttons
        // Let's click the "Ver precios" link
        await page.click('text=Ver precios');
        
        // Assert we got to the Modalidades section
        await expect(page.locator('text=Modalidades y Costos')).toBeVisible();

        // 2. Test FAQ expansion
        // Let's click the first question
        const firstFaq = page.locator('text=¿Aceptas niños y adultos?');
        await firstFaq.click();
        
        // Assert the answer appears
        await expect(page.locator('text=Sí, el método se adapta. Trabajo con niños desde los 6 años hasta adultos')).toBeVisible();
    });

    test('Can fill out and submit the lead form (via honeypot path)', async ({ page }) => {
        await page.goto('/music');

        // Locate the form area
        await expect(page.locator('text=O déjame tus datos y yo te escribo')).toBeVisible();

        // Fill out the visible fields
        await page.fill('input[name="name"]', 'Demo User');
        await page.fill('input[name="whatsapp"]', '5551234567');
        
        // Select zone
        await page.selectOption('select[name="zone"]', 'Santa Fe');

        // Fill times
        await page.fill('input[name="times"]', 'Demo time slot');

        // Since subject has 'hidden' class, we expose it or use evaluate
        // Honeypot triggers silent success without triggering n8n webhook
        await page.evaluate(() => {
            const el = document.querySelector('input[name="subject"]') as HTMLInputElement | null;
            if (el) el.value = 'Honeypot Trigger';
        });

        // Check the consent box
        await page.check('input[id="consent"]');

        // Submit form
        await page.click('button[type="submit"]');

        // Verify successful state is shown
        const successTitle = page.locator('text=¡Gracias!');
        await expect(successTitle).toBeVisible({ timeout: 5000 });
        await expect(page.locator('text=Tus datos han sido enviados.')).toBeVisible();
    });
});
