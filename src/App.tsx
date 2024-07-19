import * as React from "react";
import { useState } from "react";
import "./App.css";
import Login from "./Login";

interface AutocompletionOption {
  label: string;
}

function App() {
  return (
    <>
      <Login />
    </>
  );
}

export default App;
