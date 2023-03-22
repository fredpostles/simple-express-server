module.exports.checkToken = (req, res, next) => {
  const { simpsons, headers } = req;

  // NOTE: insomnia turns currentToken into all lowercase, hence lowercase here
  if (!headers.currenttoken) {
    res.send({ status: 0, error: "Token not set" });
    return;
  }

  // find the user
  const user = simpsons.find(
    (item) => item.userTokens && item.userTokens.includes(headers.currenttoken)
  );
  if (!user) {
    res.send({ status: 0, error: "Token not valid" });
    return;
  }

  req.currentUser = user;

  next();
};
