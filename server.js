
const Express = require('express');
const bodyParser = require('body-parser');
const google = require('./google-connection/google')
const app = Express()
const jwt = require('jsonwebtoken')

const jwtKey = 'secret'

app.use(bodyParser.json())


app.post('/login', async (req, res) => {
  let creds = {
    email: req.body.email,
    password: req.body.password
  }

  let result = await google.userLogin(await google.authorize(), creds).catch(e => console.error(e));

  if (result){
    let token = jwt.sign(creds, jwtKey, { expiresIn: '1h' });
    console.log(token)
    res.status(200).json({token: token})
  }
  else{
    console.log('user not found')
    res.status(401)
  }
})

app.post('/createUser', (req, res) => {

  console.log(`create account for: ${req.body.email}`)
  
  try {
    const user = {
      id: 1,
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }

    let result = createAccount(user)

    if (result){
      console.log("user added")
      res.status(200)
    }
  }
  catch {
    res.status(400)
    console.log("create user failed")
  }
})

app.listen(3000, () => {
  console.log('App running on http://localhost:3000')
})

async function createAccount(user){
  const newAccount = await google.createNewProfile(await google.authorize(), user).catch(console.error)

  return newAccount
  //console.log(newAccount);
}