import { useMeQuery } from "../../generated/graphql"
import Feed from "../Feed/Feed"
import Login from "../Login/Login"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const { data } = useMeQuery()

  if (!data?.me) {
    return <Login />
  }

  return <Feed />
}

export default HomePage
