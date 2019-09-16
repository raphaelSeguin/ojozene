const connection = require('./connection');

const addMail = async (email) => {
    try {
        const db = await connection;
        const emails = await db.collection('emails');
        emails.insertOne({ email });
    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    addMail,
};
