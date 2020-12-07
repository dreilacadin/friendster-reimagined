import { Status, ToastMessage, ToastOptions, useToast } from "@chakra-ui/react"
import { ReactNode, useEffect, useState } from "react"

export const useAppToast = () => {
  const [toastMessage, setToastMessage] = useState<
    { title: string; description: string } | undefined
  >(undefined)

  const toast = useToast()

  useEffect(() => {
    if (toastMessage) {
      const { title, description } = toastMessage

      toast({
        title,
        description,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true
      })
    }
  }, [toastMessage])

  return setToastMessage
}
