if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require('express');
const DBConfig = require('./DBConfig/DBConfig');
const app = express();
const User = require('./models/User');
const cors = require('cors');
const requireAuth = require('./middleware/auth');
const register = require("./routes/auth");
const login = require("./routes/auth");

app.use(express.json());
app.use(cors());

DBConfig();

app.get('/user', async (req, res) => {
    const user = await User.find();
    res.json({user : user}) 
});

app.post("/login", login);

app.post('/register', register);

app.get('/protected', requireAuth, (req, res) => {
    res.status(200).json({ message: 'Acceso a ruta protegida exitoso!' });
  });

app.listen(process.env.PORT, () => {
    console.log("El servidor corre en el puerto: "+process.env.PORT)
});