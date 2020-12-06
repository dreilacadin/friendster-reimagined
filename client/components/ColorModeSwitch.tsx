import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useColorMode, IconButton } from "@chakra-ui/react"

interface ColorModeSwitchProps {}

const ColorModeSwitch: React.FC<ColorModeSwitchProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"
  return (
    <IconButton
      aria-label="color mode switch"
      variant="ghost"
      position="fixed"
      top="1rem"
      right="1rem"
      icon={isDark ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  )
}

export default ColorModeSwitch
