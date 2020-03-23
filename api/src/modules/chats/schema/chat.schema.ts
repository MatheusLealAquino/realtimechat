import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  users: [String],
  messages: [{
    userId: String,
    date: Date,
    message: String
  }],
});
