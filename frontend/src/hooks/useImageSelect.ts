import { useState } from 'react'

export const useImageSelect = () => {
  const [inputAvatar, setInputAvatar] = useState({ data: '', name: '' })

  const handleImageSelect = (e: React.FormEvent) => {
    const reader = new FileReader()
    const { files } = e.target as HTMLInputElement
    if (files) {
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        setInputAvatar({
          data: reader.result as string,
          name: files[0] ? files[0].name : 'unknownfile',
        })
      }
    }
  }

  return { handleImageSelect, inputAvatar, setInputAvatar }
}
