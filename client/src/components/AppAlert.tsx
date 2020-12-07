import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from "@chakra-ui/react"

interface AlertProps {
  status: "info" | "warning" | "success" | "error" | undefined
  title: string
  description: string
}

const AppAlert: React.FC<AlertProps> = ({ status, title, description }) => {
  return (
    <Box mb={3}>
      <Alert status={status}>
        <AlertIcon />
        <AlertTitle mr={2}>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    </Box>
  )
}

export default AppAlert
