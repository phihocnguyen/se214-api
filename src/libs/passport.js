const passport = require("passport");
const { findExistingUserByEmail, registerWithGoogle } = require("../services/auth");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email", ],
    },
    async function (accessToken, refreshToken, profile, done) {
      const userInfo = profile._json;
      try {
        const existingUser = await findExistingUserByEmail(userInfo.email);
        if (existingUser) {
          done(null, userInfo);
          return;
        }
        const newUser = await registerWithGoogle(userInfo.email, userInfo.given_name, userInfo.family_name, userInfo.picture);
        done(null, userInfo);
      }
      catch {
        done(new Error("Login fail"), null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
