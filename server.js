
const Express = require('express');
const bodyParser = require('body-parser');
const google = require('./google-connection/google')
const app = Express()
const jwt = require('jsonwebtoken')

const jwtKey = 'secret'

const idCol = 0
const emailCol = 1
const nameCol = 2
const passwordCol = 3

app.use(bodyParser.json())


app.post('/login', async (req, res) => {
  let creds = {
    email: req.body.email,
    password: req.body.password
  }

  let result = await google.userLogin(await google.authorize(), creds).catch(() => res.status(500));

  if (result){
    let token = jwt.sign(creds, jwtKey);
    console.log(token)
    res.status(200).json({token: token})
  }
  else{
    console.log('user not found')
    res.status(401).send()
  }
})

app.post('/createUser', async (req, res) => {

  console.log(`create account for: ${req.body.email}`)
  
  try {
    const user = {
      id: 1,
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }
    const foundUser = await google.getUserByEmail(await google.authorize(), user.email)
    if(!foundUser){
      const result = await google.createNewProfile(await google.authorize(), user).catch(console.error)
      if (result){
        res.status(200).send()
      } else {
        res.status(400).send()
      }
    } else {
      res.status(409).send()
    }
  }
  catch {
    res.status(400)
  }
})

app.post('/authenticateToken', async (req, res) => {
  let user = jwt.verify(req.body.token, jwtKey)
  google.getUserByEmail(await google.authorize(), user.email).then(foundUser => {
    if (foundUser) {
      res.status(200).json({
        email: foundUser.email,
        name: foundUser.name
      })
    } else {
      res.status(401).send()
    }
  })
})

app.listen(3000, () => {
  console.log('App running on http://localhost:3000')
})