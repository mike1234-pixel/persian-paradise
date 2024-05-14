export const getOptions = <T>(
  items: T[] | undefined,
  valueKey: keyof T,
  labelKey: keyof T
) => {
  if (!items) return []

  return items
    ? items.map((item) => ({
        value: item[valueKey],
        label: item[labelKey]
      }))
    : []
}
