import { Box, useColorModeValue, useRadio } from "@chakra-ui/react"

const RadioCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const bg = useColorModeValue("white", "gray.800")
  const color = useColorModeValue("gray.800", "white")

  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg,
          color,
          borderColor: "teal.400"
        }}
        px={5}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
