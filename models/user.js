const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, //고유성
  },
});

//사용자 이름, 암호 필드를 추가한다. / 사용자 이름 중복 여부를 확인한다
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
