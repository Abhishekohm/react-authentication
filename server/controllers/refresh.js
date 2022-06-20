const jwt = require('jsonwebtoken');
const User = require('../models/Users')

exports.refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) {
        return res.sendStatus(403);
    }
    const refreshToken = cookies.jwt; // extracting refreshToken from cookies
    console.log(refreshToken)
    const foundUser = await User.findOne({ refreshToken }); // searching user on the basis of refreshToken
    console.log("user => ", foundUser);
    if (!foundUser) {
        return res.sendStatus(403);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log(decoded)
            if (err || foundUser._id.toString() !== decoded.id.toString()) {
                return res.sendStatus(403);
            }

            const accessToken = foundUser.getAccessToken();
            res.json({
                accessToken, user: {
                    username: foundUser.username,
                    id: foundUser._id
                }
            });
        }
    )
}