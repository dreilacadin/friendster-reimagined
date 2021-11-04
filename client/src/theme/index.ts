// Global style overrides
import styles from "./styles"

// Font overrides
import fonts from "./fonts/fonts"

// Foundational styles overrides
import borders from "./foundations/borders"

// Component style overrides
import Button from "./components/button"
import Heading from "./components/heading"

// Layer styles
import layerStyles from "./layerStyles"

import { extendTheme } from "@chakra-ui/react"

const overrides = {
  layerStyles,
  fonts,
  styles,
  borders,
  // Other foundational style overrides go here
  components: {
    Button,
    Heading
    // Other components go here
  }
}

export default extendTheme(overrides)
