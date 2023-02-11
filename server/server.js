const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const { ApolloServer } = require("apollo-server-express");
const bcrypt = require("bcrypt-promise");

const typeDefs = require("./schema/typeDefs");
const { User } = require("./models");

const resolvers = {
  Query: {
    me: async () => {
      return await User.find({}).exec();
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const hashed = await bcrypt.hash(password, 10);
      return {
        token: "Testing",
        user: await User.create({
          username,
          email,
          password: hashed,
          savedBooks: [],
        }),
      };
    },

    login: async (_, { email, password }) => {
      const user = await User.find({ email });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          return {
            token: "TESTING",
            user,
          };
        }
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
