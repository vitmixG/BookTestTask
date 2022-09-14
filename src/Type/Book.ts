export interface Book {
  title: string,
  aurthor: string,
  category: string,
  ISBN: string,
}
export interface NewBook extends Book {
  id: number
}
