const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { google } = require("./passportConfig");

export const initPassport = (app) => {
  //init's the app session
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SECRET,
    })
  );
  //init passport
  app.use(passport.initialize());
  app.use(passport.session());
};

passport.use(
  new GoogleStrategy({
    google,
  }),
  async (accessToken, refreshToken, profile, cb) => {
    console.log(profile);

    document(null, formatGoogle(profile._json));
  }
);

// serialize deserialize//
passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

//format data//
const formatGoogle = (profile) => {
  return {
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
  };
};
