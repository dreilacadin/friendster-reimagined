import Footer from "../Footer/Footer"
import NavBar from "../NavBar/NavBar"
import styles from "../../styles/Home.module.scss"

interface LayoutProps {
  exclude?: Array<string>
}

const Layout: React.FC<LayoutProps> = ({ exclude, children }) => {
  return (
    <div className={styles.container}>
      {!exclude?.includes("header") && <NavBar />}
      <main className={styles.main}>{children}</main>
      {!exclude?.includes("footer") && <Footer />}
    </div>
  )
}

export default Layout
