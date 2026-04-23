const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const isAuth = require('../middleware/isAuth');
const { register, login, me } = require('../controllers/authController');
const router = express.Router();

const createToken = (user) => jwt.sign(
  { id: user._id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

router.post('/register', register);
router.post('/login', login);

// Start GitHub OAuth
router.get('/github', passport.authenticate('github', {
  scope: ['read:user', 'user:email', 'public_repo']
}));

// GitHub callback
router.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', (err, user) => {
    if (err || !user) {
      console.error('GitHub OAuth failed:', err || 'No user returned');
      return res.redirect(`${process.env.CLIENT_URL}/login?error=github_auth_failed`);
    }

    return req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error('GitHub session login failed:', loginErr);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=github_auth_failed`);
      }

      const token = createToken(user);
      return res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${encodeURIComponent(token)}`);
    });
  })(req, res, next);
});

// Get current logged-in user
router.get('/me', isAuth, me);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;
