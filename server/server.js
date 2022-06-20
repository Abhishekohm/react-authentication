require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error");
const cookiePaser = require('cookie-parser');
const cors = require('cors');
const refresh = require('./routes/refresh')
const ErrorResponse = require('./utils/errorResponse')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')

const app = express();
app.use(credentials)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
	console.log("Database connected");
});

app.use("/auth", require("./routes/auth"));
app.use("/private", require("./routes/private"));
app.use('/refresh', require("./routes/refresh")) // refresh token not getting saved
app.use('/logout', require('./routes/logout'));


app.all('*', (req, res) => {
	throw new ErrorResponse("Page Not Found", 404);
})
//error handlerr should be the last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
	console.log(`Logged error: ${err.message}`);
	server.close(() => process.exit(1));
});
