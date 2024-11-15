export function sortByDate(a: any, b: any): number {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
}
