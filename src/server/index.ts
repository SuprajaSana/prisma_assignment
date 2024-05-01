import { pokemonRouter } from "./routers/pokemon";

import { router } from "./trpc";

export const appRouter = router({
  pokemon: pokemonRouter,
});

export type AppRouter = typeof appRouter;
