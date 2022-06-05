require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const userRouter = require("./api/users/user.router");

const app = express();

app.use(cors({
	origin: process.env.CLIENT_URI,
	credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRouter);

const port = process.env.API_PORT || 4000;
app.listen(port, () => {
	console.log("Server up and running on PORT :", port);
});
