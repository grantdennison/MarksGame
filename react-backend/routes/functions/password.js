import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  const hashPwd = await bcrypt.hash(password, 5);
  return hashPwd;
}

export function matchPassword(password) {
  UserSchema.pre("save", function (next) {
    const user = this;

    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError);
        } else {
          bcrypt.hash(user.password, salt, function (hashError, hash) {
            if (hashError) {
              return next(hashError);
            }

            user.password = hash;
            next();
          });
        }
      });
    } else {
      return next();
    }
  });
}
