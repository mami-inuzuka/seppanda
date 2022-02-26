import { useContext, useState, VFC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, Flex, FormControl, FormHelperText, FormLabel, Grid, Heading, Image, Input, Text } from '@chakra-ui/react'

import DefaultUserIcon from 'assets/images/default-user-icon.png'
import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { AuthContext } from 'context/AuthContext'
import { createUser } from 'lib/api/user'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

import type { CreateUserParams } from 'types/createUserParams'

type LocationState = {
  invitationToken: string
}

export const Onboarding: VFC = () => {
  const [inputName, setInputName] = useState<string>('')
  const [inputAvatar, setInputAvatar] = useState({ data: '', name: '' })
  const [processing, setProcessing] = useState<boolean>(false)
  const { errorToast, successToast } = useToast()
  const location = useLocation<LocationState>()
  const { setCurrentUser } = useContext(AuthContext)
  const history = useHistory()

  const handleImageSelect = (e: React.FormEvent) => {
    const reader = new FileReader()
    const { files } = e.target as HTMLInputElement
    if (files) {
      reader.onload = () => {
        setInputAvatar({
          data: reader.result as string,
          name: files[0] ? files[0].name : 'unknownfile',
        })
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleCreateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params: CreateUserParams = {
      name: inputName,
      avatar: inputAvatar,
      invitationToken: location.state.invitationToken,
    }
    setProcessing(true)
    const token = await auth.currentUser?.getIdToken(true)
    try {
      const res = await createUser(params, token)
      if (res.status === 200) {
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
      }
    } catch {
      errorToast('登録に失敗しました')
    } finally {
      setProcessing(false)
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
                  src={!inputAvatar.data ? DefaultUserIcon : inputAvatar.data}
                  alt={!inputAvatar.name ? 'default-user-icon' : inputAvatar.name}
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
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={handleImageSelect}
                    display="none"
                  />
                  <Flex h="100%" align="center" justify="center">
                    画像を選択
                  </Flex>
                </FormLabel>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">なまえ</FormLabel>
              <Input value={inputName} onChange={(event) => setInputName(event.target.value)} id="name" size="lg" />
              <FormHelperText>なまえは後から変えられます</FormHelperText>
            </FormControl>
            <PrimaryButton isLoading={processing} onClickButton={handleCreateUser} disabled={processing}>
              上記の内容で登録する
            </PrimaryButton>
          </Grid>
        </form>
      </Box>
    </HeaderOnlyLogoLayout>
  )
}
