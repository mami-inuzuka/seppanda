import { useContext, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'

import DefaultUserIcon from 'assets/images/default-user-icon.png'
import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { AuthContext } from 'context/AuthContext'
import { useSelectImage } from 'hooks/useSelectImage'
import { createUser } from 'lib/api/user'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

import type { CreateUserParams } from 'types/createUserParams'
import type { MultipleErrorResponse } from 'types/multipleErrorResponses'

type LocationState = {
  invitationToken: string
}

export const Onboarding: VFC = () => {
  const { errorToast, successToast } = useToast()
  const location = useLocation<LocationState>()
  const { setCurrentUser } = useContext(AuthContext)
  const history = useHistory()
  const { handleImageSelect, imageData, imageName } = useSelectImage()

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<CreateUserParams>({
    mode: 'all',
    defaultValues: {
      name: auth.currentUser?.displayName,
    },
  })

  const handleCreateUser = async (params: CreateUserParams) => {
    const data = {
      name: params.name,
      avatar: { data: imageData, name: imageName },
      invitationToken: location.state.invitationToken,
    }
    const token = await auth.currentUser?.getIdToken(true)
    try {
      const res = await createUser(data, token)
      setCurrentUser(res.data?.user)
      if (location.state.invitationToken) {
        history.push('/')
        successToast('登録が完了しました')
      } else {
        history.push({
          pathname: '/invitation',
          state: { invitationToken: res.data.invitationToken },
        })
        successToast('登録が完了しました')
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        ;(err.response?.data as MultipleErrorResponse).messages.forEach((message) => {
          errorToast(message)
        })
      } else {
        errorToast('エラーが発生しました')
      }
    }
  }

  return (
    <HeaderOnlyLogoLayout>
      <Box p={6}>
        <Box mb={8}>
          <Heading size="lg" textAlign="center" my={4}>
            Welcome!
          </Heading>
          <Text fontSize="sm">あなたのプロフィール画像となまえを設定しましょう</Text>
        </Box>
        <form>
          <Grid gap={8}>
            <FormControl>
              <Flex align="center" direction="column">
                <Image
                  src={imageData || DefaultUserIcon}
                  alt={imageName || 'default-user-icon'}
                  boxSize="124px"
                  borderRadius="full"
                  border="4px"
                  borderColor="gray.200"
                  mb={4}
                />
                <FormLabel
                  bg="gray.50"
                  color="gray.900"
                  borderRadius="base"
                  h="32px"
                  border="1px solid rgba(46, 47, 46, 0.1)"
                  boxShadow="0px 1px 0px #D7D7D7"
                  pl={3}
                  pr={3}
                  m={0}
                >
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    display="none"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('avatar', {
                      onChange: (e) => handleImageSelect(e as React.FormEvent),
                    })}
                  />
                  <Flex h="100%" align="center" justify="center">
                    画像を選択
                  </Flex>
                </FormLabel>
              </Flex>
            </FormControl>
            <FormControl isInvalid={!!errors?.name} errortext={errors?.name?.message}>
              <FormLabel htmlFor="name">なまえ</FormLabel>
              <Input
                id="name"
                size="lg"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('name', {
                  required: 'なまえを入力してください',
                  maxLength: {
                    value: 15,
                    message: '15文字以下で入力してください',
                  },
                })}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              ) : (
                <FormHelperText>なまえは後から変えられます</FormHelperText>
              )}
            </FormControl>
            <PrimaryButton
              isLoading={formState.isSubmitting}
              onClickButton={handleSubmit(handleCreateUser)}
              disabled={!formState.isValid || formState.isSubmitting}
            >
              上記の内容で登録する
            </PrimaryButton>
          </Grid>
        </form>
      </Box>
    </HeaderOnlyLogoLayout>
  )
}
