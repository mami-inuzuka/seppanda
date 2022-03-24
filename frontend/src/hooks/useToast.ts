import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

const defaultParams: UseToastOptions = {
  position: 'top',
  isClosable: true,
}

export const useToast = () => {
  const toast = useChakraToast()

  const errorToast = (title: string, description?: string) => {
    toast({
      ...defaultParams,
      duration: 8000,
      status: 'error',
      title,
      description,
    })
  }

  const successToast = (title: string, description?: string) => {
    toast({
      ...defaultParams,
      duration: 3000,
      status: 'success',
      title,
      description,
    })
  }

  return {
    errorToast,
    successToast,
  }
}
