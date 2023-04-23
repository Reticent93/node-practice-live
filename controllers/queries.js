const getUsers = 'SELECT * FROM users';
const getUserById = 'SELECT * FROM users WHERE id = $1';
const checkEmailExists = 'SELECT u FROM users u WHERE u.email = $1';
const updateUser = 'UPDATE users SET name = $1, email = $2 WHERE id = $3'
const createUser = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
const deleteUser = 'DELETE FROM users WHERE id = $1';


const getProviders = 'SELECT * FROM providers';
const getProviderById = 'SELECT * FROM providers WHERE id = $1';
const checkNameExists = 'SELECT p FROM providers p WHERE p.name = $1';
const createProvider = 'INSERT INTO providers (name, phone) VALUES ($1, $2)';
const updateProvider = 'UPDATE providers SET name = $1, phone = $2 WHERE id = $3';

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    createUser,
    updateUser,
    deleteUser,
    getProviders,
    getProviderById,
    checkNameExists,
    createProvider,
    updateProvider,
};