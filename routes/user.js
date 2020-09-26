const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../models/User')

router.post('/login', async(req, res) => {
  try {
    let user = await User.findByCredentials(req.body.email, req.body.password)
    const authToken = await user.generateAuthToken()
    user = user.toJSON()
    res.status(200)
    res.json({
      user,
      authToken
    })
  } catch (error) {
    res.status(401).json({
      error: true,
      message: error.message
    })
  }
})

router.post('/register', async(req, res) => {
  try {
    let user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      dob: req.body.dob,
      category: req.body.category
    })
    const authToken = await user.generateAuthToken()
    user = user.toJSON()
    res.status(201)
    res.json({
      user,
      authToken
    })
  } catch (error) {
    res.status(401).json({
      error: true,
      message: error.message
    })
  }
})

router.get('/', auth, async(req, res) => {
  try {
    const user = req.user.toJSON()
    res.status(200).json({
      ...user
    })
  } catch (error) {
    res.status(401).json({
      error: true,
      message: error.message
    })
  }

})

module.exports = router