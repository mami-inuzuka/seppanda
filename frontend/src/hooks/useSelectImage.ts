import { useCallback, useState } from 'react'

export const useSelectImage = () => {
  const [imageData, setImageData] = useState('')
  const [imageName, setImageName] = useState('')

  const handleImageSelect = useCallback((e: React.FormEvent) => {
    const reader = new FileReader()
    const { files } = e.target as HTMLInputElement
    if (files) {
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        setImageData(reader.result as string)
        setImageName(files[0] ? files[0].name : 'unknownfile')
      }
    }
  }, [])

  return { handleImageSelect, imageData, imageName, setImageData, setImageName }
}
