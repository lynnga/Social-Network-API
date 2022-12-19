const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
   userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique:true, 
      match:[ /.+\@.+\..+/, "must be an emailadress"]


    },
   
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema.virtual("friendcount").get(function(){
  return this.friends.length
})
const User = model('user', userSchema);

module.exports = User;
