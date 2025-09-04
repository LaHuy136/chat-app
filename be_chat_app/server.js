const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./src/models');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', require('./src/routes/auth.route'));
app.use('/message', require('./src/routes/message.route'));
app.use('/conversation', require('./src/routes/conversation.route'));

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync(); 
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start:', err);
  }
})();