export const normalize = (string: string) => {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/à/g, "a")
    .toLowerCase()
}
