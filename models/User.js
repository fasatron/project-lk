const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    first_name: { type: String, default: '', trim: true, required: true },
    last_name: { type: String, default: '', trim: true, required: true },
    email: {
      type: String,
      default: '',
      trim: true,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/,
        'Incorrect email',
      ],
    },
    password: { type: String, required: true, min: 7 },
    image: { data: Buffer, contentType: String },
    avatar: {
      type: String,
      default: 'http://armanpalace.ru/css/images/noava.svg',
    },
    about: { type: String, default: '', trim: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    rate: { type: Number, min: 0, default: 0 },
    skills: [{ type: String, ref: 'Skill' }],
  },
  {
    toObject: { getters: false, virtuals: false },
    toJSON: { versionKey: false, getters: true },
    timestamps: true,
  },
);

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next);
});

userSchema.post('save', function(error, user, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('User with the same email already exists'));
  } else {
    next(error);
  }
});

userSchema.statics.authenticate = function(email, password) {
  return this.findOne({ email }).then(user => {
    if (!user) {
      const error = new Error('User not found');

      error.status = 401;
      throw error;
    }

    return bcrypt.compare(password, user.password).then(isEqual => {
      if (!isEqual) {
        const error = new Error('Incorrect password');

        error.status = 401;
        throw error;
      }

      return user;
    });
  });
};

userSchema.virtual('full_name').get(function() {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('User', userSchema);
