const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/recipes', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

async function addTestUser() {
  const email = 'test@gmail.com';
  const plainPassword = 'test';
  const password = await bcrypt.hash(plainPassword, 10);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Test user already exists.');
    process.exit();
  }

  const user = new User({ email, password });
  await user.save();
  console.log('Test user added!');
  process.exit();
}

addTestUser();