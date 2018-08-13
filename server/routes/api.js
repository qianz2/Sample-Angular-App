const express = require('express');
const router = express.Router();


//Below json file represents our data as given
//Load our flat data file into a const
const data = require('../res/data.json')


// Basic default route to make sure our module is importing/serving correctly.
router.get('/', (req, res, next) => {
  res.send('Default API Route');
});

//Get route for all products
router.get('/v1/products', (req, res, next) => {

  //data should ALWAYS exist, even as an empty object
  //So if it's null, 500.
  if (!data){
    const error = new Error('Error loading product data')
    error.httpStatusCode = 500
    return next(error)
  }

  res.send(data)
})

//Get route for product via ID
//Returns single product at given id
router.get('/v1/products/:id', (req, res, next) => {
  var id = req.params.id

  // Do a quick check if the given id was deleted
  // If it is, assume bad client request for defunct product
  if (!data[id]){
    const error = new Error('Missing Product ID')
    error.httpStatusCode = 404
    return next(error)
  }

  res.status(200).send(data[id])
})

//Put route for product via ID
router.put('/v1/products/:id', (req, res, next) => {
  var id = req.params.id
  // Do a quick check if the given id was deleted
  // If it is, assume bad client request to update defunct product
  if (!data[id]){
    const error = new Error('Missing Product ID')
    error.httpStatusCode = 404
    return next(error)
  }

  // Send the new object back in our response
  res.status(200).send(data[id])
})

//Delete route for product via ID
router.delete('/v1/products/:id', (req, res, next) => {
  var id = req.params.id
  // Do a quick check if the given id exists
  // If it is, assume bad client request to delete defunct product
  if (!data[id]){
    const error = new Error('Missing Product ID')
    error.httpStatusCode = 404
    return next(error)
  }

  delete data[id]
  // Send the new object back in our response
  res.status(204).end()
})






module.exports = router;
