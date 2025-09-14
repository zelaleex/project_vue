import { describe, it, expect } from 'vitest';
import { useValidation } from '../composables/useValidation';

describe('useValidation', () => {
  const { validateProject } = useValidation();

  it('should return error if name is missing', () => {
    const result = validateProject({ name: '', budget: 100 });
    expect(result).toBe('A projekt neve kötelező.');
  });

  it('should return error if budget is not positive', () => {
    const result = validateProject({ name: 'Teszt', budget: 0 });
    expect(result).toBe('A költségvetésnek pozitív számnak kell lennie.');
  });

  it('should return empty string if valid', () => {
    const result = validateProject({ name: 'Teszt', budget: 100 });
    expect(result).toBe('');
  });
});
