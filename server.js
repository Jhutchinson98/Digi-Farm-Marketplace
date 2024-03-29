
const Express = require('express');
const bodyParser = require('body-parser');
const google = require('./google-connection/google')
const app = Express()
const jwt = require('jsonwebtoken')

const jwtKey = 'secret'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


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
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }
    const foundUser = await google.getUserByEmail(await google.authorize(), user.email)
    if(!foundUser){
      const result = await google.createNewProfile(await google.authorize(), user).catch(console.error)
      if (result.status){
        res.status(200).send()
      } else {
        res.status(400).send()
      }
    } else {
      res.status(409).send()
    }
  }
  catch {
    res.status(400).send()
  }
})

app.post('/addProduct', async (req, res) => {
  console.log('adding product: ', req.body)
  google.authorize()
  google.getUserByEmail(await google.authorize(), req.body.userEmail)
  .then(async (user) => google.createNewProduct(await google.authorize(), { userId: user.id, ...req.body }))
  .then(result => {
    if (result.status){
      res.status(200).send()
    } else {
      res.status(500).send()
    }
  })
  .catch(e => {
    console.log(e)
    res.status(500).send()
  })
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

app.post('/getProducts', async (req, res) => {
  const auth = await google.authorize()
  google.getUserByEmail(auth, req.body.email)
  .then(user => {
    return google.getProductsByUserId(auth, user.id)
  })
  .then(products => res.status(200).json(products))
  .catch(e => res.status(500).send())
})

app.get('/getMarkets', (req, res) => {
  google.authorize()
  .then(google.getProfiles)
  .then(profiles => res.status(200).json(profiles))
  .catch(() => res.status(500).send())
})

app.listen(3000, () => {
  console.log('App running on http://localhost:3000')
})