// module.exports.random = (length) => {
//   const random = Math.floor(Math.random() * length);
//   return `${random}${Date.now()}`;
// };

module.exports.getUniqueId = (length) => {
  let uniqueId = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz";
  let charsLength = chars.length;

  for (let index = 0; index < length; index++) {
    uniqueId += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return uniqueId + Date.now();
};
