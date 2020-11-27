export const numberFormatter = (number) => {
  const newNumber = Number(number).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR', minimumFractionDigits: 0
  });
  return newNumber;
}
export const capitlizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}