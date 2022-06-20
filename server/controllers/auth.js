const User = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({ username, email, password });
		sendToken(user, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { username, password } = req.body; // email can be used
	if (!username || !password) {
		return next(new ErrorResponse("Username and passoword are required", 400))
	}
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return next(new ErrorResponse("User doesn't exist", 404));
		}
		const isMatch = await user.matchPassword(password); // .matchPassword is an instance method so call it through user(an insatnce of User) not from User (model)
		if (isMatch) {
			sendToken(user, 200, res);
		} else {
			return next(new ErrorResponse("Incorrect username or passoword", 401));
		}
	} catch (error) {
		next(error);
	}
};

exports.forgotPassword = (req, res, next) => {
	res.send("Forgot Password route");
};

exports.resetPassword = (req, res, next) => {
	res.send("Reset Password route");
};

const sendToken = (user, statusCode, res) => { // frontend response
	const tokens = user.getSignedToken(); // .getSignedToken() is instance method on instances of User model that returns jwt
	res.cookie('jwt', tokens.refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
		sameSite: "None",
		secure: true
	})
	res.status(statusCode).json({
		success: true,
		user: {
			username: user.username,
			id: user._id
		},
		accessToken: tokens.accessToken,
	});
};
