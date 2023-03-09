/**
 * This is a simple table that displays a list of names and ages.
 * This code was writen by ChatGPT. 
 * I commented the code to understand what is going on.
 */

import { useState } from "react"; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"; // components from Material UI

// interface seems to be similiar to interface in Java
interface Row {
  id: number;
  name: string;
  age: number;
}

// this array represents the table data
const rows: Row[] = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Sarah", age: 32 },
  { id: 3, name: "Bob", age: 18 },
  { id: 4, name: "Alice", age: 45 },
];

const SimpleTable = () => {
  // initial state is null, setSelected is a function that sets the state
  const [selected, setSelected] = useState<number | null>(null);

  // this function is called when a row is clicked
  const handleRowClick = (id: number) => {
    setSelected(id); // that's a MUI component
  };

  // this part is React JSX. This part looks like my normal javascript files.
  return (
    // this is basically like a Table in HTML
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {rows.map((row) => (
            <TableRow key={row.id} onClick={() => handleRowClick(row.id)} selected={row.id === selected}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
