const getCellValue = (row, columnKey) => {
  const numericFields = ['age']
  const value = row[columnKey]

  return numericFields.includes(columnKey) ? parseFloat(value) || 0 : String(value).toLowerCase()
}

export const getComparer = (columnKey, direction) => (a, b) => {
  if (direction === 'none') return 0

  const valA = getCellValue(a, columnKey)
  const valB = getCellValue(b, columnKey)

  if (typeof valA === 'number' && typeof valB === 'number') {
    return direction === 'asc' ? valA - valB : valB - valA
  }

  return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
}
