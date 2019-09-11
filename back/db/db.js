const connection = require('./connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// const findToto = async () => {
//     const db = await connection;
//     const essai = await db.collection('essai');
//     return essai.findOne({user: /toto/});
// }

// const addUser = async ({name, pass}) => {
//     const db = await connection;
//     const users = await db.collection('users');

//     bcrypt.hash(pass, saltRounds, async (err, hash) => {
//         if (err) throw err;
//         const result = await users.insertOne({name, hash});
//     })
//     .catch( err => console.log(err))
// }

// const userExists = async (name) => {
//     const db = await connection;
//     const users = await db.collection('users');
//     const foundUser = await users.findOne({name});
//     return !! foundUser;
// }

// const createUser = async ({name, pass}) => {
//     const alreadyExists = await userExists(name);
//     console.log('existe déjà : ', alreadyExists);
//     if (alreadyExists) {
//         return { message: 'user already exist' };
//     } else {
//         try {
//             addUser({name, pass})
//         } catch(e) {
//             return { message: 'problem with database' }
//         }
//         return { message: 'user created' };
//     }
// }

// const authenticateUser = async ({name, pass}) => {
//     const users = db.collection('users');
//     const user = await users.findOne({name});
//     const match = bcrypt.compare(pass, user.hash);
//     if (match) {
//         // ok 
//     } else {
//         // refused
//     }
// }

const addMail = async (email) => {
    try {
        const db = await connection;
        const emails = await db.collection('emails');
        emails.insertOne({email})
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    // findToto,
    // createUser,
    addMail
}
