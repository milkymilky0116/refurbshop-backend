import client from "../client";
import { Resolver, Resolvers, Token } from "./types";
import * as jwt from "jsonwebtoken";

export const getUser = async (token) => {
  try {
    if (token) {
      const { id } = <Token>jwt.verify(token, process.env.SECRET_KEY);
      const user = await client.user.findUnique({ where: { id } });
      if (user) {
        return user;
      } else {
        return null;
      }
    }
  } catch {
    return null;
  }
};
export const protectedResolver =
  (ourResolver: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  };
