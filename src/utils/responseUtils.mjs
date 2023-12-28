const handleSuccessfulResponse = (res, data) => {
  return res.status(200).json({ message: 'OK', data });
}

const handleServerError = (error, res) => {
  console.log(error)
  return res.status(500).json({ message: 'An error occurred', data: null });
}

const handleInvalidRequestError = (res) => {
  return res.status(400).json({ message: 'Invalid Request', data: null });
}

export default {handleSuccessfulResponse, handleServerError, handleInvalidRequestError}