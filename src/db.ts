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
    upgradeDB.createObjectStore("usedColors", {
      autoIncrement: true,
      keyPath: "id"
    });
  }
});

const typeDefs = gql`
  scalar DateTime

  scalar Board

  scalar Color

  type SpriteBoard {
    id: ID!
    name: String!
    board: Board!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UsedColor {
    id: ID!
    color: Color!
  }

  type Query {
    boards: [SpriteBoard]
    board(id: ID!): SpriteBoard
    usedColors: [UsedColor]
  }

  type Mutation {
    createBoard(name: String, board: Board!): SpriteBoard!
    updateBoard(id: ID!, name: String, board: Board!): SpriteBoard!
    deleteBoard(id: ID!): Int!

    addUsedColor(color: Color!): UsedColor!
  }
`;

interface ResolverContext {
  db: Promise<IDBPDatabase>;
}

// type ResolverType<A = any> = (root: any, args: A, ctx: ResolverContext) => any;

const hexToRGB = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  result!.shift();
  return result!.map(i => parseInt(i, 16));
};

const addZero = (n: string) => (Number(n) < 10 ? `0${n}` : n);

const RGBtoHex = ([r, g, b]: [number, number, number]) => {
  return `#${addZero(r.toString(16))}${addZero(g.toString(16))}${addZero(
    b.toString(16)
  )}`;
};

const resolvers = {
  Color: new GraphQLScalarType({
    name: "Color",
    parseValue(value) {
      return hexToRGB(value);
    },
    serialize(value) {
      return RGBtoHex(value);
    }
  }),
  Board: new GraphQLScalarType({
    name: "Board",
    parseValue(value) {
      return value.map((row: any) => row.map(hexToRGB));
    },
    serialize(value) {
      return value.map((row: any) => row.map(RGBtoHex));
      // return [...value.split("\n").map((row: any) => row.split(",").map())];
    }
  }),
  Query: {
    board: async (root: any, args: { id: number }, ctx: ResolverContext) => {
      const db = await ctx.db;

      const r = await db
        .transaction("spriteBoards", "readonly")
        .objectStore("spriteBoards")
        .get(Number(args.id));

      return r;
    },
    boards: async (root: any, args: {}, ctx: ResolverContext) => {
      const db = await ctx.db;
      return db
        .transaction("spriteBoards", "readonly")
        .objectStore("spriteBoards")
        .getAll();
    },
    usedColors: async (root: any, args: {}, ctx: ResolverContext) => {
      const db = await ctx.db;
      const os = db
        .transaction("usedColors", "readonly")
        .objectStore("usedColors");

      const keys = await os.getAllKeys();

      if (keys.length < 1) return [];

      const r = await os.getAll();

      return r.reverse().slice(0, 16);
    }
  },
  Mutation: {
    createBoard: async (
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
    updateBoard: async (
      root: any,
      args: {
        id: number;
        name?: string;
        board: SpriteBoard;
      },
      ctx: ResolverContext
    ) => {
      const db = await ctx.db;
      const os = db
        .transaction("spriteBoards", "readwrite")
        .objectStore("spriteBoards");

      const current = await os.get(Number(args.id));

      const updates = {
        ...current,
        board: args.board,
        updatedAt: new Date().toISOString()
      };

      const id = await os.put(updates);

      return os.get(id);
    },
    deleteBoard: async (
      root: any,
      args: { id: number },
      ctx: ResolverContext
    ) => {
      const db = await ctx.db;
      return db
        .transaction("spriteBoards", "readwrite")
        .objectStore("spriteBoards")
        .delete(Number(args.id));
    },
    addUsedColor: async (
      root: any,
      args: { color: [number, number, number] },
      ctx: ResolverContext
    ) => {
      const db = await ctx.db;
      const os = db
        .transaction("usedColors", "readwrite")
        .objectStore("usedColors");
      const id = await os.add({ color: args.color });

      return os.get(id);
    }
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export const query = async (q: string, v?: { [key: string]: any }) => {
  const res = await graphql(executableSchema, q, null, { db }, v);

  if (res.errors && res.errors.length > 0) {
    throw res.errors;
  }

  if (res.data) {
    return res.data;
  }
};
