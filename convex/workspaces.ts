import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
    args: { 
        name: v.string() 
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if(!userId){
            throw new Error("Unauthorized");
        }
        //Create proper method for code generation later
        const joinCode = "123456";
        const workspaceId = await ctx.db.insert("workspaces", { name: args.name, userId, joinCode });
        return workspaceId;
    },
  });
export const get = query({
    args: {},
    handler: async (ctx) => {
        const workspaces =  await ctx.db.query("workspaces").collect();
        return workspaces;
    },
});

export const getById = query({
    args: {id: v.id("workspaces")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if(!userId){
            throw new Error("Unauthorized");
        }

        const workspace = await ctx.db.get(args.id);
        return workspace;
    },
})