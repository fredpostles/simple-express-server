module.exports.checkToken = (req, res, next) => {
  const { body, simpsons, headers } = req;

  if (!headers.currenttoken) {
    res.send({ status: 0, error: "Token not set" });
    return;
  }

  const indexOfUser = simpsons.findIndex((user) => {
    if (!user.userTokens) return;
    return user.userTokens.includes(headers.currenttoken);
  });

  console.log(indexOfUser);
  // check the token
  if (indexOfUser === -1) {
    res.send({ status: 0, error: "Token not valid" });
    return;
  }

  console.log("Auth ran, token valid");

  req.currentUser = simpsons[indexOfUser];

  next();
};
