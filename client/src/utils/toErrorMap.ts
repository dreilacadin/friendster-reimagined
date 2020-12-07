import { capitalize } from "./capitalize"

type FieldError = {
  property: string
  constraints: { [key: string]: string }
}

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {}
  errors.forEach(({ property, constraints }) => {
    const formattedValue = capitalize(Object.values(constraints)[0])
    errorMap[property] = formattedValue
  })

  console.log(errorMap)

  return errorMap
}
