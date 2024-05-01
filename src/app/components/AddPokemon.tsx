"use client";
import { useState } from "react";

import { trpc } from "../_trpc/client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormLabel, Container, Stack } from "@mui/material";

export default function AddPokemon() {
  const pokemon = trpc.pokemon.getPokemon.useQuery();

  const addPokemon = trpc.pokemon.addPokemon.useMutation({
    onSettled: () => {
      pokemon.refetch();
    },
  });

  const [name, setName] = useState("");
  const [types, setTypes] = useState("");
  const [sprite, setSprite] = useState("");

  return (
    <div>
      <Container style={{ backgroundColor: "white" }} fixed>
        <form style={{ minWidth: "1000px" }}>
          <Stack spacing={3} direction="row">
            <div>
              <FormLabel style={{ fontWeight: "bold", marginRight: "10px" }}>
                Name
              </FormLabel>
              <TextField
                onChange={(e) => setName(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={name}
                size="small"
                fullWidth
              />
            </div>
            <div>
              <FormLabel style={{ fontWeight: "bold", marginRight: "10px" }}>
                Type
              </FormLabel>
              <TextField
                onChange={(e) => setTypes(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={types}
                size="small"
                fullWidth
              />
            </div>
            <div>
              <FormLabel style={{ fontWeight: "bold", marginRight: "10px" }}>
                Sprite
              </FormLabel>
              <TextField
                onChange={(e) => setSprite(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={sprite}
                size="small"
                fullWidth
              />
            </div>
            <div style={{ marginTop: "25px" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ width: "200px", height: "30px" }}
                onClick={async () => {
                  addPokemon.mutate({ name, types, sprite });
                  setName("");
                  setTypes("");
                  setSprite("");
                }}
              >
                Add Pokemon
              </Button>
            </div>
          </Stack>
        </form>
      </Container>
    </div>
  );
}
