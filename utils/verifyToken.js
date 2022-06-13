import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next({
      status: 401,
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return next({
        status: 401,
        message: "Unauthorized",
      });

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); //if user is admin or if user is the same as the id in the url call the next middleware or users endpoint
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
  });
};
