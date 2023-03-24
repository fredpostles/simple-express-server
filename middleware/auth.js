module.exports.checkToken = (req, res, next) => {
  const { simpsons, headers } = req;

  if (!headers.token) {
    res.send({ status: 0, error: "Token not set" });
    return;
  }

  // find the user
  const user = simpsons.find(
    (item) => item.userTokens && item.userTokens.includes(headers.token)
  );
  if (!user) {
    res.send({ status: 0, error: "Token not valid" });
    return;
  }

  req.currentUser = user;

  next();
};
