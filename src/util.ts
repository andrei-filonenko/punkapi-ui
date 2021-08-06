export function pickRandom<T>(list: Array<T>): T {
  return list[Math.floor(Math.random() * list.length)]
}

export function formatDate(d: Date) {
  const month = d.getUTCMonth() + 1
  const year = d.getUTCFullYear()
  return `${month}-${year}`
}

export function parseUSDate(s: String): Date {
  const [m, y] = s.split('/')
  const year = y ? parseInt(y) : parseInt(m)
  const month = y ? parseInt(m) : 1
  return new Date(year, month - 1, 1)
}
