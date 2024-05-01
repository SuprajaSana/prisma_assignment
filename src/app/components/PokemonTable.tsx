"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { trpc } from "../_trpc/client";
import { useState } from "react";

export default function PokemonList(props: any) {
  const pokemon = trpc.pokemon.getPokemon.useQuery();
  const arr = pokemon.data;
  const filterArr = props.pokemon;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div
      style={{
        marginTop: "50px",
        paddingBottom: "50px",
        width: "1000px",
        height: "auto",
        border: "2px solid black",
        marginLeft: "40px",
        backgroundColor: "whitesmoke"
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                borderBottom: "2px solid black",
              }}
            >
              <TableCell style={{ fontWeight: "bold" }}>Id</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Sprite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!props.filter &&
              arr
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderBottom: "2px solid lightgrey",
                      },
                    }}
                    style={{
                      borderTop: "2px solid lightgrey",
                    }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.types}</TableCell>
                    <TableCell>{row.sprite}</TableCell>
                  </TableRow>
                ))}
            {props.filter &&
              filterArr
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderBottom: "2px solid lightgrey",
                      },
                    }}
                    style={{
                      borderTop: "2px solid lightgrey",
                    }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.types}</TableCell>
                    <TableCell>{row.sprite}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={props.filter ? filterArr?.length : arr?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
