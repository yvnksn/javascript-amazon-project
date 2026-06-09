export function formatCurrency(priceCents) {
    // To fixed has an issue with rounding numbers that end in 5.
    return (Math.round(priceCents) / 100).toFixed(2)
}