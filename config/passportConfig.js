import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { executeQuery } from "../config/db.js";

// ✅ Local strategy configuration
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const [employee] = await executeQuery(
          "SELECT * FROM employees WHERE email = ?",
          [email]
        );

        console.log(employee, 'employee')

        if (!employee) {
          return done(null, false, {
            message: "❌ Employee not found. Please register first.",
          });
        }

        const isMatch = await bcrypt.compare(password, employee.password);

        if (!isMatch) {
          return done(null, false, {
            message: "❌ Invalid email/phone or password.",
          });
        }

        // ✅ Authentication successful
        return done(null, employee);
      } catch (err) {
        console.error("Passport Auth Error:", err);
        return done(err);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const [user] = await executeQuery(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );
    done(null, user || null);
  } catch (err) {
    done(err, null);
  }
});

export default passport;