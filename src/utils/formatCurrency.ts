const priceFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
})

export function formatCurrency(amount: number): string {
  return priceFormatter.format(amount)
}
