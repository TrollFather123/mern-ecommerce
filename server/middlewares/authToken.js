const jwt = require("jsonwebtoken");

exports.authToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if(!token){
        throw new Error("user not authorized!!!")
    }

    const encodedToken = token.split(" ")[1];

    const decodedToken = await jwt.verify(
      encodedToken,
      process.env.SECRET_KEY,
      function (error, decoded) {
        if (error) {
        throw new Error("user not authorized!!!")
        }
        return decoded
      }
    );

    req.userId = decodedToken.id;

    next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};
