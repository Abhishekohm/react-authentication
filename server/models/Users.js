const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	refreshToken: {
		type: String,
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordDate: {
		type: Date,
	},
});

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
		return;
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.matchPassword = async function (password) {
	const res = await bcrypt.compare(password, this.password);
	return res;
};

UserSchema.methods.getAccessToken = function () {
	return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
	});
}

UserSchema.methods.getSignedToken = function () {
	const res = {
		accessToken: jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
		}),
		refreshToken: jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
		})
	}
	this.refreshToken = res.refreshToken;
	this.save(); // works
	return res;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
