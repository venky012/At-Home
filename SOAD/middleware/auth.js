const jwt= require('jsonwebtoken')
const config= require('config')
module.exports =function (req,res,next){
  const token= req.header('x-auth-token')
  if (!token) return res.status(401).send('Access denied. No token provided.')
  //decoded payload will be recieved
  try{
  const decoded=jwt.verify(token, config.get('jwtPrivateKey'));
  req.user=decoded;
  console.log(req.user)
  //can be used as req.user._id
  next();
  }
  catch(ex){
  res.status(400).send('Invalid token.');
  }
}
