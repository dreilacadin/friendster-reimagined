import { useApolloClient } from "@apollo/client"
import {
  Flex,
  Avatar,
  Box,
  Button,
  Text,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  MenuGroup
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import {
  MeDocument,
  MeQuery,
  RegularUserFragment,
  useLogoutMutation
} from "../../generated/graphql"

interface UserMenuProps {
  user: RegularUserFragment
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [logout] = useLogoutMutation()
  const { cache } = useApolloClient()
  const router = useRouter()

  const evictCachedUser = () => {
    const cachedUser: MeQuery | null = cache.readQuery({ query: MeDocument })
    cache.evict({ id: `User:${cachedUser?.me?.id}` })
    cache.gc()
  }

  const logoutHandler = async () => {
    await logout()
    evictCachedUser()
    router.replace("/")
  }

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" p={3}>
        <Flex alignItems="center">
          <Box mr="3">
            <Text fontWeight="semibold">{`${user.firstName} ${user.lastName}`}</Text>
          </Box>
          <Avatar size="xs">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem onClick={() => router.push(`${user.username}`)}>My Account</MenuItem>
          <MenuItem>Payments </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Actions">
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
