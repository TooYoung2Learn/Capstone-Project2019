const Pool = require('pg').Pool
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'Muslim@54',  
  port: 5432,
});
const saltRounds = 10;

config = {
    user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'Muslim@54',  
  port: 5432,
  }
  const {Client}= require('pg');
  const client = new Client(config);

const signup =(request, response)=>{
  const {firstname, lastname, email, password, gender, jobrole, department, address} = request.body;

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
              pool.query('INSERT INTO member (firstname, lastname, email, password, gender, jobrole, department, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [firstname, lastname, email, hash, gender, jobrole, department, address], (error, results) => {
          if (error) {
            throw error
          }
          response.status(201).send(`New User created successfull`)
        })
              
      });
  });//end of bcrypt fun
}

const login= (request, response)=>{
   const { email, password} = request.body;  

  pool.query('SELECT id, password FROM member WHERE email = $1', [email], (error, results) => {
        if (error) {
          throw error
        }
        //get user data
        const dbUserid = results.fields[0].name;
        const userPassw = results.fields[1].name;
       try{
        // compare hash and password type
          const match = bcrypt.compare(password, userPassw);
          if(match){
            
            const token = jwt.sign({ userId: dbUserid }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                resp.status(200).json({
                  userId: dbUserid,
                  token: token
                });

          }else{
             throw error
          }

       }catch{
         response.status(401).json({
          error: new Error('Invalid request!')
        });

       }// end of catch
    }) //end of pool func
     
}// end of login module

const createArticle =(request, response)=>{
  const{title, article, createdon} = request.body;
  config = {
    user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'Muslim@54',  
  port: 5432,
  }
  const {Client}= require('pg');
  const client = new Client(config);

  client.connect()
  .query('INSERT INTO article (title, article, createdon) VALUES ($1, $2, $3)', [title], [article], [createdon]).
  then(results=>console.log(results)).catch(e=>console.error(e.stack)).then(()=>client.end())
  /*client.query('INSERT INTO article (title, article, createdon) VALUES ($1, $2, $3)', [title], [article], [createdon], (err, res)=>{
    if (err) throw err
     response.status(201).send(  ' $[res.title]' )
    client.end();
  })*/
  
 /*pool.query('INSERT INTO article (title, article, createdon) VALUES ($1, $2, $3)', [title], [article], [createdon], (error, results) => {
    if (error) {
      throw error
      }
      response.status(201).send(  'articleId successfull' )//end of response
  })*/
}

const getArticleId = (request, response) => {
  const id = parseInt(request.params.articleId)

  pool.query('SELECT * FROM article WHERE articleid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsers = (request, response) => {
 
pool.query("SELECT * FROM member", (error, results) => {
    if (error) {
      throw error
    }
   
   response.status(200).json(results.rows)
   
  })//end of pool func
   
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createGifs = (request, response) => {
 // const id = parseInt(request.params.articleId)

  pool.query("insert into gif( title, url) values ('play boy', 'http://www.boy.com')", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json('gif created successfull')
  })
}

const createComment = (request, response) => {
 //const id = parseInt(request.params.articleId)

  pool.query("insert into comment(authorId, comment, statusid)values(1, 'it is a nice job', 1)", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json('gif comment added successfull')
  })
}

const createUser = (request, response) => {

 // const { name, email } = request.body;
 pool.query("insert into member( firstName,lastName, email,password, gender,jobRole,department,address) values ('hajara', 'usman', 'hajara@gmail.com', '1237', 'Female', 'staff', 'HR', 'Mongo street')", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(' member added successfull')
  })

  
  }

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  createArticle,
  getArticleId,
  createGifs,
  createComment,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  signup,
  login,
 
  
}


