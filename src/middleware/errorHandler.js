function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500);
  res.render("error", { error: err });
}

export default errorHandler;
