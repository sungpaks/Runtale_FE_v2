import * as React from "react";
import { useState } from "react";
import "./App.css";
import { Autocomplete, Button, TextField } from "@mui/material";
import Foo from "./foo";

interface AutocompletionOption {
  label: string;
}

function App() {
  const [count, setCount] = useState(0);
  const options: AutocompletionOption[] = [
    { label: "어벤져스" },
    { label: "인사이드아웃" },
    { label: "데드풀" },
  ];

  return (
    <>
      <Button variant="contained">HELLO!!</Button>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Movie"></TextField>
        )}
      ></Autocomplete>
      <Foo />
    </>
  );
}

export default App;
