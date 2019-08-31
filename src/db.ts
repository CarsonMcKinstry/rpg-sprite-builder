import { openDB, IDBPDatabase } from "idb";
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";
import { graphql, GraphQLScalarType, DocumentNode } from "graphql";
import { SpriteBoard } from "./types";

const db = openDB("rpg-sprite-builder", 1, {
  upgrade(upgradeDB) {
    upgradeDB.createObjectStore("spriteBoards", {
      autoIncrement: true,
      keyPath: "id"
    });
  }
});

const typeDefs = gql`
  scalar DateTime

  scalar Board

  type SpriteBoard {
    id: ID!
    name: String!
    board: Board!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    boards: [SpriteBoard]
    board(id: ID!): SpriteBoard
  }

  type Mutation {
    create(name: String, board: Board!): SpriteBoard!
    update(id: ID!, name: String, board: Board!): SpriteBoard!
    delete(id: ID!): Int!
  }
`;

interface ResolverContext {
  db: Promise<IDBPDatabase>;
}

// type ResolverType<A = any> = (root: any, args: A, ctx: ResolverContext) => any;

const resolvers = {
  Board: new GraphQLScalarType({
    name: "Board",
    parseValue(value) {
      return value.map((row: any) => row.join(",")).join("\n");
    },
    serialize(value) {
      return [...value.split("\n").map((row: any) => row.split(","))];
    }
  }),
  Query: {
    board: async (root: any, args: { id: number }, ctx: ResolverContext) => {
      const db = await ctx.db;
      return db
        .transaction("spriteBoards", "readonly")
        .objectStore("spriteBoards")
        .get(args.id);
    },
    boards: async (root: any, args: {}, ctx: ResolverContext) => {
      const db = await ctx.db;
      return db
        .transaction("spriteBoards", "readonly")
        .objectStore("spriteBoards")
        .getAll();
    }
  },
  Mutation: {
    create: async (
      root: any,
      args: { name: string; board: SpriteBoard },
      ctx: ResolverContext
    ) => {
      const db = await ctx.db;
      const os = db
        .transaction("spriteBoards", "readwrite")
        .objectStore("spriteBoards");
      const id = await os.add({
        ...args,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      return os.get(id);
    },
    update: async (
      root: any,
      args: {
        id: number;
        name?: string;
        board: SpriteBoard;
      },
      ctx: ResolverContext
    ) => {
      const db = await ctx.db;
      const updates = {
        id: args.id,
        board: args.board,
        updatedAt: new Date().toISOString(),
        name: ""
      };

      if (args.name) {
        updates.name = args.name;
      } else {
        delete updates.name;
      }
      const os = db
        .transaction("spriteBoards", "readwrite")
        .objectStore("spriteBoards");

      const id = await os.put(updates);

      return os.get(id);
    },
    delete: async (root: any, args: { id: number }, ctx: ResolverContext) => {
      const db = await ctx.db;
      return db
        .transaction("spriteBoards", "readwrite")
        .objectStore("spriteBoards")
        .delete(args.id);
    }
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export const query = (q: string, v?: { [key: string]: any }) =>
  graphql(executableSchema, q, null, { db }, v);
