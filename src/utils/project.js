export function createProject({ name, description, startDate, budget }) {
  return {
    id: Date.now().toString(),
    name,
    description,
    startDate,
    budget: Number(budget)
  };
}
