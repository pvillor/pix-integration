export function convertBufferToImage(data: number[]) {
  const buffer = Buffer.from(data)
  const base64Data = buffer.toString('base64')

  const imageUrl = `data:image/png;base64,${base64Data}`

  return imageUrl
}
