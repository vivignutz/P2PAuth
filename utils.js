// utils.js
function getUserRole(token) {
    const decodedToken = jwt.decode(token);
    return decodedToken.role;
  }
  
  export { getUserRole };