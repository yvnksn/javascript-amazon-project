/**
 * 
 * @param {} priceCents 
 * @returns currency in two decimal places.
 */
export function formatCurrency(priceCents) {
    return (priceCents / 100).toFixed(2)
}