import mongoose from "mongoose"
const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique : true
  },
  authorName: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  }
},{
    timestamps : true
})
export const Book = mongoose.model('books',booksSchema)