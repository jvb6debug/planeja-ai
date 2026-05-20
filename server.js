const express = require("express");
const dotenv = require('dotenv');

dotenv.config({ path: './dotenv.env' });

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const teamRoutes = require("./routes/teamRoutes");
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');

const teamMemberRoutes = require("./routes/teamMemberRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/teams", teamRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

app.use("/team-members", teamMemberRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running 🚀");
});
