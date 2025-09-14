export function useValidation() {
  function validateProject({ name, budget }) {
    if (!name) return 'A projekt neve kötelező.';
    if (!budget || Number(budget) <= 0) return 'A költségvetésnek pozitív számnak kell lennie.';
    return '';
  }
  return { validateProject };
}
