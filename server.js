const express = require('express')
const app = express();

const db = require('./config/connection')

app.use(express.urlencoded({ extended: false }));

const eventsRoutes = require('./routes/events/events');
const usersRoutes = require("./routes/users/users")

app.use("/events", eventsRoutes);
app.use("/users", usersRoutes);

db.once('open', () => {
  app.listen(3000, () => {
    console.log(`API server running on port 3000!`);
  });
});