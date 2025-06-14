export interface IBlogDetail {
  frontmatter: {
    layout: string
    title: string
    description: string
    imagePath: string
    imageAlt: string
    viewTransitionName: string
    date: string
    icon: string | string[]
    tags: string[]
  }
  file: string
  url: string
  rawContent: unknown | any
  compiledContent: unknown | any
  getHeadings: unknown | any
  Content: unknown | any
  default: unknown | any
}
