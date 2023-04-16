const google = require('../google-connection/google')
const router = require("express").Router()

async function userLogin(email, password){

    testCreds = {
        email: email,
        password: password
    }

    const test = await google.userLogin(await google.authorize(), testCreds).catch(console.error);

}

router.post('/', (req, res) => {
    console.log(req.body)
})

module.exports = router