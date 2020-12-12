import { ArrowUpDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useColorMode, Icon, Select, Box } from "@chakra-ui/react"

interface ColorModeSwitchProps {}

const ColorModeSwitch: React.FC<ColorModeSwitchProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"
  return (
    <Select
      size="sm"
      borderRadius="md"
      icon={<ArrowUpDownIcon />}
      iconSize="12px"
      width="125px"
      onChange={toggleColorMode}
      value={colorMode}
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </Select>
  )
}

export default ColorModeSwitch
