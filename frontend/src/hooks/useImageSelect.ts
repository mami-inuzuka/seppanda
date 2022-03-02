import { useState } from 'react'

import { getCompressedImageFile } from 'lib/imageCompression'

export const useImageSelect = () => {
  const [inputAvatar, setInputAvatar] = useState({ data: '', name: '' })

  const handleImageSelect = async (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const reader = new FileReader()
      const imageFile = e.currentTarget.files[0]
      const compressedFile = await getCompressedImageFile(imageFile)
      reader.readAsDataURL(compressedFile)
      reader.onload = () => {
        setInputAvatar({
          data: reader.result as string,
          name: compressedFile ? compressedFile.name : 'unknownfile',
        })
      }
    }
  }

  return { handleImageSelect, inputAvatar, setInputAvatar }
}
