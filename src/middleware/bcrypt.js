const bcrypt = require('bcrypt');

async function hashPassword(password) {
 const hash = await bcrypt.hash(password, 12);
   
    return hash;
}

async function checkPassword(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
}

module.exports = { hashPassword, checkPassword };