import Head from "next/head"
import styles from "../styles/Home.module.scss"
import ColorModeSwitch from "../components/ColorModeSwitch"
import Footer from "../components/Footer/Footer"
import LandingPage from "../components/LandingPage/LandingPage"

export default function Home() {
  return (
    <div className={styles.container}>
      <ColorModeSwitch />
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <LandingPage />
      </main>

      <Footer></Footer>
    </div>
  )
}
