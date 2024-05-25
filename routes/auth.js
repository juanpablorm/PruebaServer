const bcrypt = require('bcrypt');
const User = require('../models/User');
const requireAuth = require('../middleware/auth');

const register = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ mail, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const login = (req, res) => {
  const {email, password} = req.body;
  User.findOne({email : email})
  .then(user => {
      if(user) {
          bcrypt.compare(password, user.password, (err, result) => {
              if(result) {
                  res.cookie('userToken', 'tokenValue', { });
                  res.json("Exitoso");
              } else {
                  res.json("La contraseña es incorrecta");
              }
          });
      } else {
          res.json("No existe el usuario");
      }
  })}

module.exports = register;
module.exports = login;