const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    first_name: { type: String, default: '', trim: true, required: true },
    last_name: { type: String, default: '', trim: true, required: true },
    email: { type: String, default: '', trim: true, required: true },
    image: { data: Buffer, contentType: String },
    avatar: {
      type: String,
      default: 'http://armanpalace.ru/css/images/noava.svg',
    },
    about: { type: String, default: '', required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    rate: { type: Number, min: 0, default: 0 },
    skills: [{ type: String, ref: 'Skill' }],
  },
  {
    toObject: { getters: false, virtuals: false },
    toJSON: { versionKey: false, getters: true },
    timestamps: true,
  }
);

UserSchema.virtual('profile_url').get(function() {
  return '/users/' + this._id;
});

UserSchema.virtual('full_name').get(function() {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('User', UserSchema);
