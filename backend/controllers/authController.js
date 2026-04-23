const publicUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  displayName: user.displayName,
  avatar: user.avatar,
  profileUrl: user.profileUrl
});

exports.me = (req, res) => {
  res.json(publicUser(req.user));
};
