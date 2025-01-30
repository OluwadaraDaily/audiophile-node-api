var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  res.redirect('/login')
})

router.post('/register', (req, res, next) => {
  console.log('REQUEST =>', req)
  // console.log('REQUEST =>', req.body)
  res.json({
    status: 200
  })
})

module.exports = router;
