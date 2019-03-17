const { Pool } = require('pg');
const dotenv = require('dotenv');
//this sets env variables
dotenv.config();
//to connect to DB
const pool = new Pool({
    connectionString:process.env.NODE_ENV=='test'? process.env.DATABASE_TEST: process.env.DATABASE_URL
  });
  pool.on('connect', () => {
    console.log('connected to epic db');
  });  

//create all tables
const createTables = () => {
    const sql = `
    DROP TABLE IF EXISTS user_groupings;
    DROP TABLE IF EXISTS  groups CASCADE;
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email varchar(128) NOT NULL,
        first_name varchar(128) NOT NULL,
        last_name varchar(128) NOT NULL,
        password varchar(250) NOT NULL
    );
    CREATE TABLE messages(
        id SERIAL PRIMARY KEY,
        created_on TIMESTAMP,
        email VARCHAR(128) NOT NULL,
        subject VARCHAR(128) NOT NULL,
        message VARCHAR(250) NOT NULL,
        status VARCHAR(10) NOT NULL,
        sender INTEGER REFERENCES users(id),
        reciever INTEGER REFERENCES users(id),
        is_deleted VARCHAR(10) NOT NULL,
        group_status VARCHAR(10) NOT NULL
    );
    CREATE TABLE groups(
        id SERIAL PRIMARY KEY,
        group_name VARCHAR(128) NOT NULL,
        group_email VARCHAR(128) NOT NULL,
        created_by INTEGER NOT NULL REFERENCES users(id)
    );
    CREATE TABLE user_groupings(
        group_id INTEGER REFERENCES groups(id),
        user_id INTEGER REFERENCES users(id)
    );
    `;
    pool.query(sql)
    .then(() => {
        console.log('table created');
        pool.end();
    })
    .catch((err) => {
        console.log('table not created',err);
        pool.end();
    });
}
return createTables();
// require('make-runnable');