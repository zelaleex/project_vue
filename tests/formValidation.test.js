import { describe, it, expect } from 'vitest';
import { isValidBudget } from '../src/utils/format';

// Example validation logic from ProjectForm.vue
function validateForm({ name, budget }) {
  if (!name) return 'A projekt neve kötelező.';
  if (!isValidBudget(budget)) return 'A költségvetésnek pozitív számnak kell lennie.';
  return '';
}

describe('Form validáció', () => {
  it('Hibát ad, ha a név üres', () => {
    const result = validateForm({ name: '', budget: 100 });
    expect(result).toBe('A projekt neve kötelező.');
  });

  it('Hibát ad, ha a költségvetés nem pozitív szám', () => {
    const result = validateForm({ name: 'Teszt', budget: -5 });
    expect(result).toBe('A költségvetésnek pozitív számnak kell lennie.');
  });

  it('Hibát ad, ha a költségvetés nem szám', () => {
    const result = validateForm({ name: 'Teszt', budget: 'abc' });
    expect(result).toBe('A költségvetésnek pozitív számnak kell lennie.');
  });

  it('Nem ad hibát, ha minden adat helyes', () => {
    const result = validateForm({ name: 'Teszt', budget: 100 });
    expect(result).toBe('');
  });
});
