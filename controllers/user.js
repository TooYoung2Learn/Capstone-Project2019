
const Pool = require('pg').Pool
const bcrypt = require('bcrypt');
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'Muslim@54',  
  port: 5432,
})



exports.signup = (req, res, next) => {

 //const { email, password } = req.body;
 const email = req.body.email;
 const password = req.body.password;
 const saltRounds = 10;
 
  //end of bcrypt function
   res.status(201).json({
        message: 'Post saved successfully!'
      });

};


 exports.login =(request, response)=>{
  const { email, password } = request.body;
      async function checkUser(email, password) {
      //... fetch user from a db etc.
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
          if (error) {
            throw error
          }
        });
   
      const match = await bcrypt.compare(password, results.password);
      if (!match){
          throw error
      }
   
      else(match) {
          //
          const token = jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
            res.status(200).json({
              userId: user._id,
              token: token
            });
      } 
    //...
    }//end of async function 
}


