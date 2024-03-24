export const urlify = (path: string) => {
  return path
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/&/g, '')
    .replace(/-+/g, '-')
}
