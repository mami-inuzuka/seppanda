import { useContext, useEffect, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Box, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Image, Input } from '@chakra-ui/react'
import axios from 'axios'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { HeaderWithTitleLayout } from 'components/templates/HeaderWithTitleLayout'
import { UserContext } from 'context/UserContext'
import { useImageSelect } from 'hooks/useImageSelect'
import { updateUser } from 'lib/api/user'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

import type { MultipleErrorResponse } from 'types/multipleErrorResponses'
import type { UpdateUserParams } from 'types/updateUserParams'

export const Setting: VFC = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { errorToast, successToast } = useToast()
  const navigation = useNavigate()
  const { handleImageSelect, inputAvatar, setInputAvatar } = useImageSelect()

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<UpdateUserParams>({
    mode: 'all',
    defaultValues: {
      name: currentUser?.name,
    },
  })

  const handleUpdateUser = async (params: UpdateUserParams) => {
    const idToken = await auth.currentUser?.getIdToken(true)
    const data = {
      avatar: inputAvatar,
      name: params.name,
    }
    try {
      const res = await updateUser(data, idToken)
      setCurrentUser(res.data.user)
      navigation('/home')
      successToast('ユーザー情報を更新しました')
    } catch (err) {
      if (axios.isAxiosError(err) && (err.response?.data as MultipleErrorResponse).messages) {
        ;(err.response?.data as MultipleErrorResponse).messages.forEach((message) => {
          errorToast(message)
        })
      } else {
        errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
      }
    }
  }

  const handleSignOut = async () => {
    await auth.signOut()
    navigation('/')
    successToast('ログアウトしました')
  }

  useEffect(() => {
    if (currentUser) {
      setInputAvatar({ data: currentUser.avatar.data, name: currentUser.avatar.name })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HeaderWithTitleLayout title="アカウント設定">
      <Box p={6}>
        <form>
          <Grid gap={6}>
            <FormControl>
              <Flex align="center" direction="column">
                <Image
                  src={inputAvatar.data}
                  alt={inputAvatar.name}
                  boxSize="100px"
                  borderRadius="full"
                  border="3px solid"
                  borderColor={`brand.${currentUser?.color}`}
                  mb={4}
                  objectFit="cover"
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
                      onChange: (e) => handleImageSelect(e as React.FormEvent<HTMLInputElement>),
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
                size="lg" // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('name', {
                  required: 'なまえを入力してください',
                  maxLength: {
                    value: 15,
                    message: '15文字以下で入力してください',
                  },
                })}
              />
              <FormErrorMessage>{errors.name && errors.name?.message}</FormErrorMessage>
            </FormControl>
            <PrimaryButton
              isLoading={formState.isSubmitting}
              onClickButton={handleSubmit(handleUpdateUser)}
              disabled={!formState.isValid || formState.isSubmitting}
            >
              保存する
            </PrimaryButton>
          </Grid>
        </form>
        <Divider my={10} />
        <Box textAlign="center">
          <SecondaryButton size="sm" onClick={handleSignOut} isFullWidth={false}>
            ログアウト
          </SecondaryButton>
        </Box>
      </Box>
    </HeaderWithTitleLayout>
  )
}
