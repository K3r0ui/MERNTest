const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const UserSchema = new Schema(  {
  
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phonenumber:{
        type:Number,
    }
  },
  { timestamps: true}
)
UserSchema.statics.findByEmail = async (email) => {
    return await User.findOne({ email });
  };
UserSchema.methods.generateJWT = async function () {
    return await jwt.sign({ id: this._id }, process.env.JWTSECRETKEY, {
      expiresIn: "10h",
    });
  };
UserSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_FACTOR));
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
  };
var User = mongoose.model('User', UserSchema)
module.exports =  { User }