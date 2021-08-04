export function pickRandom<T>(list: Array<T>): T {
  return list[Math.floor(Math.random() * list.length)]
}

export function formatDate(d: Date) {
  const month = d.getUTCMonth() + 1
  const year = d.getUTCFullYear()
  return `${month}-${year}`
}
