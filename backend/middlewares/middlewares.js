export const tokenExtraction = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const parts = req.headers["authorization"].split(" ");
  if (parts.length != 2) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    return res.status(401).json({ message: "Invalid token" });
  }
  req.token = token;

  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ status: "error", message: "Internal server error" });
};
