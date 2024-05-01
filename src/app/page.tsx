"use client";

import { trpc } from "./_trpc/client";

import { useState } from "react";
import AddPokemon from "./components/AddPokemon";
import PokemonList from "./components/PokemonTable";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container, Stack } from "@mui/material";

export default function Home() {
  const [name, setName] = useState("");
  const [types, setTypes] = useState("");
  const [filter, setFilter] = useState(false);
  const [pokemon, setPokemon] = useState([{}]);

  const pokemonByName = trpc.pokemon.getPokemonByName.useQuery({ name: name });
  const pokemonByType = trpc.pokemon.getPokemonByType.useQuery({
    types: types,
  });
  const pokemonByTypeAndName = trpc.pokemon.getPokemonByTypeAndName.useQuery({
    name: name,
    types: types,
  });

  const searchHandler = (event: any) => {
    event.preventDefault();
    var arr: any;
    if (name.length != 0 && types.length != 0) {
      arr = pokemonByTypeAndName?.data;
      console.log("arr", arr);
      console.log("Both are mentioned");
    } else if (name.length == 0 && types.length != 0) {
      arr = pokemonByType?.data;
      console.log("arr", arr);
      console.log("Types are mentioned");
    } else if (name.length != 0 && types.length == 0) {
      arr = pokemonByName?.data;
      console.log("arr", arr);
      console.log("Names are mentioned");
    } else {
      console.log("EMPTY");
    }
    setPokemon(arr);
    setFilter(true);
    setName("");
    setTypes("");
  };

  return (
    <main>
      <Container style={{ marginTop: "100px" }}>
        <AddPokemon></AddPokemon>
        <div
          style={{
            marginTop: "100px",
            marginLeft: "100px",
            minWidth: "1000px",
          }}
        >
          <form style={{ minWidth: "500" }}>
            <Stack spacing={3} direction="row">
              <div>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  variant="outlined"
                  color="secondary"
                  type="text"
                  value={name}
                  size="small"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  onChange={(e) => setTypes(e.target.value)}
                  label="Type"
                  variant="outlined"
                  color="secondary"
                  type="text"
                  value={types}
                  size="small"
                  fullWidth
                />
              </div>
              <div style={{ marginTop: "3px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "200px", height: "30px" }}
                  onClick={(e) => searchHandler(e)}
                >
                  Search Pokemon
                </Button>
              </div>
            </Stack>
          </form>
        </div>
        <PokemonList pokemon={pokemon} filter={filter}></PokemonList>
      </Container>
    </main>
  );
}
