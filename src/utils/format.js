export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.toLocaleString('hu-HU', { month: 'long' });
  const day = date.getDate();
  return `${year}<br>${month} ${day}.`;
}

export function formatBudget(budget) {
  return new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', maximumFractionDigits: 0 }).format(budget);
}

export function isValidBudget(budget) {
  return Number(budget) > 0;
}
