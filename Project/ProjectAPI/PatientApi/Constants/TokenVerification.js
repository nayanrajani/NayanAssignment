const jwt = require("jsonwebtoken");

const jwtSettings = {
  jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
};

class verifyToken {
  async validateToken(t) {
    try {
      // verify the token and decode it using the decode object
      // decode: is the object that is used by the JWT System to inform the server thet the token (Header,Payload and Signeture) ius verified successfully
      // Parameyter 1: The token to be verified
      // Parameter 2: the Secret that will be used to unpack the token for verification
      // Parameter 3: The Verification callback that will be the decoder
      let d = await jwt.verify(t, jwtSettings.jwtSecret);
      return d; //returns a promise object!!
    } catch (error) {
      return false;
    }
  }
}

module.exports = verifyToken;
