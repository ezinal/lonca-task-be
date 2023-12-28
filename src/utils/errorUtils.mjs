const handleServerError = (error, res) => {
  console.log(error)
  return res.status(500).json({ message: 'An error occurred', data: null });
}

export default handleServerError