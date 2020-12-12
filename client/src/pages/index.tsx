import Head from "next/head"
import LandingPage from "../components/LandingPage/LandingPage"
import Layout from "../components/Layout/Layout"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Friendster v2</title>
      </Head>
      <Layout>
        <LandingPage />
      </Layout>
    </div>
  )
}
