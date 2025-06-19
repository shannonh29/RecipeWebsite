const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// creates an instance of the express application
const app = express();

app.use(cors());

// adds middleware functions that modify or handle requests and responses 
// before they reach your routes or get sent back to the client.
app.use(express.json());

// used to connect a Node.js application to a MongoDB database using Mongoose
// Mongoose = an Object Data Modeling (ODM) library for MongoDB and Node.js
mongoose.connect(
    'mongodb://localhost:27017/recipes', 
    {useNewUrlParser : true, useUnifiedTopology : true});


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

// defines a Mongoose model named User, based on a schema called UserSchema
const User = mongoose.model('User', userSchema);

// defines a post API endpoint that handles user registration
// This sets up a POST route at /api/signup.
// It uses an asynchronous function because database and hashing operations are async.
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    //Uses bcrypt to hash the password
    const hash = await bcrypt.hash(password, 10);

    //Creates a new User document using the hashed password (not the original one)
    const user = new User({ email, password: hash });

    //Saves the new user to the MongoDB users collection.
    await user.save();

    //Sends a JSON response back to the client confirming the user was created.
    res.json({ message: 'User created'});
})

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({error: 'Invalid Credentials'});
    }

    const valid = await bcrypt.compare( password, user.password);
    if(!valid) {
        return res.status(400).json({error: 'Invalid Password'})
    }
    
    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
    res.json({ token });
});

app.get('/ping', (req, res) => {
  res.json({ msg: 'pong' });
});

app.listen( 5001, () => console.log('Server Running'));