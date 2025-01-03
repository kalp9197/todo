import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        msg: "User is not Authenticated"
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        msg: "Invalid Token"
      });
    }

    // req.id = decoded.user._id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Internal Server Error"
    });
  }
};