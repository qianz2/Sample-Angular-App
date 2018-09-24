const express = require('express');
const router = express.Router();

// Basic default route to make sure our module is importing/serving correctly.
router.get('/', (req, res, next) => {
  res.send('Default API Route');
});

//sample get route
router.get('/v1/:myVar',(req, res, next) => {
  var myVar = req.params.myVar

  // sample error handle
  if (!myCondition){
    const error = new Error('Generic Error')
    error.httpStatusCode = 404
    return next(error)
  }

  mySuccessObject = 0

  res.status(200).send(mySuccessObject)
})

//sample put route
router.put('/v1/:myVar', (req, res, next) => {
  var myVar = req.params.myVar

  // sample error
  if (!myCondition){
    const error = new Error('Generic Error')
    error.httpStatusCode = 404
    return next(error)
  }


  var newObject = {}
  res.status(200).send(newObject)
})

//sample delete route
router.delete('/v1/:myVar', (req, res, next) => {
  var myVar = req.params.myVar

  // sample error
  if (!myCondition){
    const error = new Error('Generic Error')
    error.httpStatusCode = 404
    return next(error)
  }

  delete data[myVar]
  // Send a success status
  res.status(204).end()
})






module.exports = router;
