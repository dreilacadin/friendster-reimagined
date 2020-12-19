import Footer from "../Footer/Footer"
import NavBar from "../NavBar/NavBar"
import styles from "../../styles/Home.module.scss"
import Head from "next/head"

interface LayoutProps {
  exclude?: Array<string>
}

const Layout: React.FC<LayoutProps> = ({ exclude, children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Friendster v2</title>
      </Head>
      {!exclude?.includes("header") && <NavBar />}
      <main className={styles.main}>{children}</main>
      {!exclude?.includes("footer") && <Footer />}
    </div>
  )
}

export default Layout
