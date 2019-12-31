import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  id: String,
  users: [String],
  messages: [{
    userId: String,
    date: Date,
    message: String
  }],
});