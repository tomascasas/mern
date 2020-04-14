function logErrors (error, req, res, next) {
  console.error(error.stack)
  next(error)
}

function clientErrorHandler(error, req, res, next) {
  const {statusCode = 500, status = 'error', message} = error
  const accept = req.headers.accept.toLowerCase()
  if(['application/json', '*/*'].indexOf(accept) < 0) next(error)
  else res.status(statusCode).json({status, message})
}

function errorHandler (error, req, res, next) {
  res.locals.message = error.message;
  res.locals.error = error
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(500)
  res.render('error', {error})
}


module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler,
}
