class response {
  static errorMessage = (req, res, status, err) => {
    res.status(status).json({
      status,
      error: err,

    });
  };

  static successMessage = (req, res, status, msg, data) => {
    res.status(status).json({
      status,
      message: msg,
      data,
    });
  };
}
export default response;
