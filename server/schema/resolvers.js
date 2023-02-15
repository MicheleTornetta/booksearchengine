const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require('mongoose');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    user: async () => {
      return User.find().populate("books");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("books");
    },

    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("books");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, { bookTitle }, description, context) => {
      if (context.user) {
        const thought = await Book.create({
          bookTitle,
          description,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { books: book._id } }
        );

        return book;
      }
      throw new Error("You need to be logged in!");
    },
    addBook: async (parent, { bookId, Title }, context) => {
      if (context.user) {
        return Book.findOneAndUpdate(
          { _id: bookId },
          {
            $addToSet: {
              books: { bookTitle, bookArthur: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new Error("You need to be logged in!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book._id } }
        );

        return book;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return Book.findOneAndUpdate(
          { _id: bookId },
          {
            $pull: {
              books: {
                _id: bookId,
              },
            },
          },
          { new: true }
        );
      }
      throw new Error("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
