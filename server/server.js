const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const { ApolloServer } = require("apollo-server-express");
const bcrypt = require("bcrypt-promise");
const { applyMiddleware } = require("./utils/auth");
const { typeDefs } = require("./schema");
const { User } = require("./models");
const crypto = require("crypto");

const resolvers = {
  Query: {
    me: async ({ token }) => {
      return await User.find({token});
    },
  },

  Mutation: {
    removeBook: async (_, { bookId, token }) => {
      const users = await User.find({token});
      if (users.length) {
        const user = users[0];

        for (let i = 0; i < user.savedBooks.length; i++) {
          if (user.savedBooks[i].bookId == bookId) {
            user.savedBooks.splice(i, 1);

            await user.save();
          }
        }

        return user;
      }

      return;
    },

    saveBook: async (_, { input, token }) => {
      const { bookId, authors, title, image, link, description } = input;

      const users = await User.find({token});
      if (users.length) {
        const user = users[0];

        user.savedBooks.push({
          authors,
          bookId,
          description,
          image,
          link,
          title
        });

        await user.save();

        return user;
      }

      return null;
    },
    addUser: async (_, { username, email, password }) => {
      return {
        token: "Testing",
        user: await User.create({
          username,
          email,
          password,
          savedBooks: [],
        }),
      };
    },

    login: async (_, { email, password }) => {
      const users = await User.find({ email });
      if (users.length) {
        const user = users[0];

        if (await bcrypt.compare(password, user.password)) {
          let token = crypto.randomBytes(64).toString("hex");

          user.token = token;
          user.save();

          return {
            token,
            user,
          };
        } else {
          console.log("bad pword");
        }
      } else {
        console.log("no user");
      }

      return null;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  await server.start();

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  server.applyMiddleware({ app });

  // if we're in production, serve client/build as static assets
  // if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../client/build")));
  // }

  app.use(routes);

  db.once("open", async () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on http://localhost:${PORT}`)
    );
  });
})();
