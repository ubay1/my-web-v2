export function sortByDate<T extends { frontmatter: { date: string | Date } }>(a: T, b: T) {
  return (
    (new Date(b.frontmatter.date) as unknown as any) -
    (new Date(a.frontmatter.date) as unknown as any)
  )
}
