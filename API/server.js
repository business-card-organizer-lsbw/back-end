const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("../router/auth/auth-router");
const usersRouter = require("../router/users/users-router");
const cardsRouter = require("../router/cards/cards-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/cards", cardsRouter);

server.get("/", (req, res) => {
	res.send("Business card server is working!");
});

module.exports = server;
