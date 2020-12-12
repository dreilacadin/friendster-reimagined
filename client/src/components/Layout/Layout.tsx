import Footer from "../Footer/Footer"
import NavBar from "../NavBar/NavBar"
import styles from "../../styles/Home.module.scss"

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
