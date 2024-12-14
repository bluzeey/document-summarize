import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";

// Initialize the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen({ port: process.env.PORT || 8500 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
