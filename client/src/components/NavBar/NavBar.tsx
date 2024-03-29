import { Flex, Heading, Link, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useMeQuery } from "../../generated/graphql"
import SearchBar from "../SearchBar/SearchBar"
import UserMenu from "../UserMenu/UserMenu"

interface NavbarProps {
  props?: any
}

const Navbar: React.FC<NavbarProps> = ({ props }) => {
  const { data } = useMeQuery()
  const boxShadow = "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);"
  const bg = useColorModeValue("white", "gray.600")

  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      py={3}
      px="35px"
      bg={bg}
      boxShadow={boxShadow}
      width="100%"
      {...props}
    >
      <Flex align="center" justify="space-between" width="100%">
        <NextLink href="/">
          <Link>
            <Heading as="h1" size="md">
              friendster
            </Heading>
          </Link>
        </NextLink>
        {data?.me && <SearchBar />}
        {data?.me && <UserMenu user={data.me} />}
      </Flex>
    </Flex>
  )
}

export default Navbar
