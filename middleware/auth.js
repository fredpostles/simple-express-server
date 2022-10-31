module.exports.checkToken = (req, res, next) => {
  const { simpsons, headers } = req;

  console.log(headers);

  if (!headers.currentToken) {
    res.send({ status: 0, error: "Token not set" });
  }

  // find the user
  //   const indexOfItem = simpsons.findIndex(
  //     (item) => item.token === headers.token
  //   );
  const indexOfItem = userTokens.findIndex(
    (item) => item.token === headers.currentToken
  );

  // check the token
  if (indexOfItem === -1) {
    res.send({ status: 0, error: "Token not valid" });
    return;
  }

  req.currentUser = simpsons[indexOfItem];

  next();
};
