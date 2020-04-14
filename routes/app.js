var express = require('express');
var router = express.Router();

router.get('/edit/:id', (req, res, next) => {
  req.url = '/'
  next()
})

router.get('/create', (req, res, next) => {
  req.url = '/'
  next()
})

router.get(/^\/index(?:\.html)?$/, (req, res, next) => {
  res.redirect('/')
})


module.exports = router
