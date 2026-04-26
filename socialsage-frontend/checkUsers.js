const mongoose = require('mongoose');
const User = require('./models/User'); // 👈 adjust path to your User.js

mongoose.connect("your-atlas-connection-string")
  .then(async () => {
    
    const googleUsers = await User.find({ googleId: { $exists: true } })
      .select('email googleId plan isPremium'); // only show these fields

    const emailUsers = await User.find({ googleId: { $exists: false } })
      .select('email plan isPremium');

    console.log("=== Google Users ===");
    console.log(googleUsers);
    console.log("Total:", googleUsers.length);

    console.log("\n=== Email/Password Users ===");
    console.log(emailUsers);
    console.log("Total:", emailUsers.length);

    mongoose.disconnect();
  })
  .catch(err => console.error(err));
