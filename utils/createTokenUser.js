const createTokenUser = (user) => {
  return { name: user.name, userId: user._id, role: user.role,email:user.email,displayPicture:user.displayPicture};
};

module.exports = createTokenUser;
