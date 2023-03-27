const { checkToken } = require("../mysql/queries");

module.exports.checkToken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    res.send({ status: 0, error: "Token not set" });
    return;
  }

  const query = checkToken();

  const params = [token];

  const results = await req.asyncMySQL(query, params);

  if (results.length) {
    next();
    return;
  }

  res.send({ status: 0, error: "Invalid token!" });
};
