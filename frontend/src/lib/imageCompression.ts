import imageCompression from 'browser-image-compression'

export const getCompressedImageFile = async (file: File) => {
  const options = {
    maxSizeMB: 0.03,
    maxWidthOrHeight: 400,
  }
  try {
    return await imageCompression(file, options)
  } catch (err) {
    console.error('getCompressImageFileAsync is error', err)
    throw err
  }
}
