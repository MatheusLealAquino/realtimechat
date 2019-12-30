import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: {type: String, unique: true},
  password: String,
  chats: [String],
  roles: [String],
});