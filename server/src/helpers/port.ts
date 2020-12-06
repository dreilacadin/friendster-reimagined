export const envPort = () => {
  let port = parseInt(process.env.PORT || "")
  if (isNaN(port) || port === 0) {
    port = 4000
  }

  return port
}
