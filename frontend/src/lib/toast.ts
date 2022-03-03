import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

const defaultParams: UseToastOptions = {
  duration: 3000,
  position: 'top',
  isClosable: true,
}

export const useToast = () => {
  const toast = useChakraToast()

  const errorToast = (title: string, description?: string) => {
    toast({
      ...defaultParams,
      status: 'error',
      title,
      description,
    })
  }

  const successToast = (title: string, description?: string) => {
    toast({
      ...defaultParams,
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
