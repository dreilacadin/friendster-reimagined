// Global style overrides
import styles from "./styles"

// Foundational styles overrides
import borders from "./foundations/borders"

// Component style overrides
import Button from "./components/button"
import { extendTheme } from "@chakra-ui/react"

const overrides = {
  styles,
  borders,
  // Other foundational style overrides go here
  components: {
    Button
    // Other components go here
  }
}

export default extendTheme(overrides)
