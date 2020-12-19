import { Box, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { useField } from "formik"

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  label: string
  name: string
  textArea?: boolean
}

const InputField: React.FC<InputFieldProps> = ({ label, textArea, size: _, ...props }) => {
  const [field, { error }] = useField(props)

  return (
    <Box mt={3}>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        {textArea ? (
          <Textarea {...field} {...props} id={field.name} value={field.value} resize="vertical" />
        ) : (
          <Input
            {...field}
            {...props}
            id={field.name}
            value={field.value}
            autoComplete={field.name}
          />
        )}
        {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </Box>
  )
}

export default InputField
