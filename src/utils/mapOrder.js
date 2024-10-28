export default function mapOrder(originalArray, orderArray, key) {
  if (!Array.isArray(originalArray) || !Array.isArray(orderArray) || originalArray.length === 0) {
    return originalArray
  }

  const originalMap = new Map(originalArray.map((item) => [item[key], item]))

  return orderArray.map((id) => originalMap.get(id)).filter(Boolean)
}
