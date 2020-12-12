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
import { RegularUserFragment, useLogoutMutation } from "../../generated/graphql"

interface UserMenuProps {
  user: RegularUserFragment
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation()
  const apollo = useApolloClient()
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost">
        <Flex alignItems="center">
          <Box mr="3">
            <Text fontWeight="semibold">{user.username}</Text>
          </Box>
          <Avatar size="xs">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Actions">
          <MenuItem
            onClick={async () => {
              await logout()
              apollo.resetStore()
            }}
          >
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
