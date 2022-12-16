// //We need to require the User model before we can create users:
// const User = require('../../models/user')

// //We're going to need to install another Node module, jsonwebtoken, for creating and verifying JWTs. npm I jsonwebtoken
// //Require the new module in the users controller but shorten the name of the variable to jwt:
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')

// //to store all of the functions defined here so we can export them to an object:
// module.exports = {
//     create,
//     login
// };


// async function create(req, res) {
//     try {
//         // Add the user to the database
//         const user = await User.create(req.body);
//         // token will be a string
//         const token = createJWT(user);
//         // Yes, we can use res.json to send back just a string
//         // The client code needs to take this into consideration
//         res.json(token);
//     } catch (err) {
//         // Client will check for non-2xx status code
//         // 400 = Bad Request
//         res.status(400).json(err);
//     }
// }

// async function login(req, res) {
//     try {
//         const user = await User.findOne({ email: req.body.email })
//         if (!user) throw new Error();
//         const match = await bcrypt.compare(req.body.password, user.password);
//         if (!match) throw new Error();
//         res.json(createJWT(user));

//     }
//     catch (err) {
//         // Client will check for non-2xx status code
//         // 400 = Bad Request
//         res.status(400).json(err);
//     }
// }



// //-----*Helper Functions*-----/

// //Let's add a createJWThelper function at the bottom of controllers/api/users.js that we can use both when a user signs up and when they log in:
// function createJWT(user) {
//     return jwt.sign(
//         // data payload
//         { user },
//         process.env.SECRET,
//         { expiresIn: '24h' }
//     );
// }

const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    create,
    login,
    checkToken
}


async function create(req, res) {
    try {
        // Add the user to the database
        const user = await User.create(req.body)

        const token = createJWT(user)
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token);
    } catch (err) {
        // Client will check for non-2xx status code
        // 400 = Bad Request
        res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) throw new Error()
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error()
        res.json(createJWT(user))
    } catch (err) {
        // Client will check for non-2xx status code
        // 400 = Bad Request
        res.status(400).json(err);
    }
}


function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
}



/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: "24h" }
    )
}