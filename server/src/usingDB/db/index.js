//used to call db functions
import { Pool } from 'pg';
//used for enviromantal variables
import dotenv from 'dotenv';

// calling config in env file
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default{
      /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}