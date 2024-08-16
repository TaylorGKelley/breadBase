import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20';
import UserModel from '../models/userModel';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:5001/api/v1/google/callback',
      scope: ['profile', 'email'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        let user = await UserModel.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails?.[0].value || '' },
          ],
        });

        if (!user) {
          user = new UserModel({
            googleId: profile.id,
            email: profile.emails?.[0].value,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            displayName: profile.displayName,
            profilePhoto: profile.photos?.[0].value,
          });
        } else {
          user.googleId = profile.id;
          user.lastLogin = new Date(Date.now());
        }

        await user.save();

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done: (err: any, id?: any) => void) => {
  UserModel.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});
