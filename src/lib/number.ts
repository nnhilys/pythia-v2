export const numberFormatter = new Intl.NumberFormat('en-EN', { maximumFractionDigits: 2 })

export const currencyFormatter = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' })

export const dateFormatter = new Intl.DateTimeFormat('en-EN', { month: 'short' })
