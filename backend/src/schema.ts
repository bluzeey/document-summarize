import { gql } from "apollo-server";
import axios from "axios";

// Sample document data
const documents = [
  {
    id: "1",
    title: "Introduction to Node.js",
    text: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable server-side applications, leveraging JavaScript as a single programming language for both client-side and server-side development. This makes it easier to understand and maintain codebases, as developers can work seamlessly across the stack.",
  },
  {
    id: "2",
    title: "Understanding GraphQL",
    text: "GraphQL is a powerful query language for APIs and a runtime for executing those queries with your existing data. It provides an efficient, powerful, and flexible alternative to REST APIs. By allowing clients to request exactly the data they need, GraphQL minimizes over-fetching and under-fetching, offering a more optimized way of managing data retrieval.",
  },
  {
    id: "3",
    title: "Getting Started with Apollo Server",
    text: "Apollo Server is a community-driven, open-source GraphQL server that works with any GraphQL schema. It helps in building robust, production-ready GraphQL APIs with ease. Apollo Server integrates seamlessly with existing Node.js applications and provides a range of tools and features to simplify the development process, including built-in performance tracing and error tracking.",
  },
];

// Define typeDefs with mutation
const typeDefs = gql`
  type Document {
    id: ID!
    title: String!
    text: String!
  }

  type Query {
    documents: [Document!]!
    document(id: ID!): Document
    summarizeDocument(id: ID!): String!
  }

  type Mutation {
    addDocument(title: String!, text: String!): Document!
  }
`;

// Utility function to generate unique ID
const generateId = (): string => (documents.length + 1).toString();

// Implement resolvers
const resolvers = {
  Query: {
    documents: () => documents.map(({ id, title }) => ({ id, title })),
    document: (parent: any, args: { id: string }) => {
      return documents.find((doc) => doc.id === args.id);
    },
    summarizeDocument: async (parent: any, args: { id: string }) => {
      const doc = documents.find((doc) => doc.id === args.id);
      if (!doc) {
        throw new Error("Document not found");
      }

      // Make a request to your Python service for summarization
      try {
        const response = await axios.post("http://localhost:8000/summarize", {
          text: doc.text,
        });
        console.log(response);
        return response.data.summary;
      } catch (error) {
        throw new Error("Failed to fetch summary");
      }
    },
  },
  Mutation: {
    addDocument: (parent: any, args: { title: string; text: string }) => {
      const newDocument = {
        id: generateId(),
        title: args.title,
        text: args.text,
      };
      documents.push(newDocument);
      return newDocument;
    },
  },
};

export { typeDefs, resolvers };
