const google = require('../google-connection/google')

const router = require("express").Router()

router.post('/', async(req, res) => {
    console.log(`create account for: ${req.body.email}`)

    try {
        const user = {
            id: 1,
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }

        let result = createAccount(user);

        if (result){
            console.log("user added")
            res.status(200)
        }
    }
    catch{
        console.log("create user failed")
        res.status(400)
    }
})


// functions that call google.js 
async function createAccount(user){
    const newAccount = await google.createNewProfile(await google.authorize(), user).catch(console.error)

    return newAccount
    //console.log(newAccount);
}


module.exports = router;