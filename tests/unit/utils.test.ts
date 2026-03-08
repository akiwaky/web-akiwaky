import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('utils', () => {
    describe('cn()', () => {
        it('should merge class names correctly', () => {
            expect(cn('base-class', 'added-class')).toBe('base-class added-class');
        });

        it('should conditionally apply classes', () => {
            expect(cn('base-class', true && 'truthy', false && 'falsy')).toBe('base-class truthy');
        });

        it('should resolve tailwind class conflicts correctly', () => {
            // Assuming tailwind-merge resolves p-4 and p-2 to p-2
            expect(cn('p-4', 'p-2')).toBe('p-2');
        });
    });
});
