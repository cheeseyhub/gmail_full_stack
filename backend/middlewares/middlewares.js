export const tokenExtraction = (req, res, next) => {
  const [scheme, token] = req.headers["authorization"].split(" ");

  if (scheme !== "Bearer") {
    return res.status(401).json({ message: "Invalid token" });
  }
  req.token = token;

  next();
};
