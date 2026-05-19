require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'prod' 
? process.env.MONGODB_URI
: process.env.DEV_MONGODB_URI
const SECRET = process.env.SECRET
const ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 3001

module.exports = {
    MONGODB_URI,
    SECRET,
    ENV,
    PORT
}