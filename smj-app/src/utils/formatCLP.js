export const formatCLP = (value) => {
  const number = typeof value === 'number' ? value : parseFloat(value) || 0;
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(number);
};
