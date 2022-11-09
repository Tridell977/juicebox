const { Client } = require('pg');
const client = new Client("postgres://localhost:5432/juicebox-dev");

const getAllUsers = async () => {
    const { rows } = await client.query(
        `Select id, username FROM users;`
    )
    return rows
}
const createUser = async ({ username, password}) => {
    try {
        const { rows } = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password]);
        console.log(rows);
        return rows;
    } catch(error){
        console.error(error)
    }
}
module.exports = {
    client,
    getAllUsers,
    createUser
}