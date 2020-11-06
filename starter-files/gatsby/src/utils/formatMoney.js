const formatter = Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export default function formatMoney(rupee) {
  return formatter.format(rupee);
}
