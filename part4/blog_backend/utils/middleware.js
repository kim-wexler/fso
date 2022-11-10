const logger = require("./logger");
const jwt = require("jsonwebtoken");

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    logger.error(error.message);
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const getTokenFrom = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (decodedToken.id) {
    request.user = decodedToken.id
  }
  next();
};

module.exports = { errorHandler, unknownEndpoint, getTokenFrom, userExtractor };
