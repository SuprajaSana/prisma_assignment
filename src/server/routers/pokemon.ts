import { z } from "zod";
import { procedure, router } from "../trpc";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const pokemonRouter = router({
  getPokemon: procedure.query(async () => {
    return await prisma.pokemon.findMany();
  }),
  addPokemon: procedure
    .input(
      z.object({
        name: z.string(),
        types: z.string(),
        sprite: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.pokemon.create({
        data: {
          name: input.name,
          types: input.types,
          sprite: input.sprite,
        },
      });
    }),
  getPokemonByName: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.pokemon.findMany({ where: { name: input.name } });
    }),
  getPokemonByType: procedure
    .input(
      z.object({
        types: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.pokemon.findMany({ where: { types: input.types } });
    }),
  getPokemonByTypeAndName: procedure
    .input(
      z.object({
        name: z.string(),
        types: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.pokemon.findMany({
        where: { name: input.name, types: input.types },
      });
    }),
});
