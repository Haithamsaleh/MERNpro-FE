import React from "react";
import book from "./Combonents/book";
import Navbar from "./Combonents/Navbar";
import './App.css';

function App() {
  return (
    <div className="App">
    <h1>tttt</h1>
       
    <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
    <Navbar.Brand href="/" className="font-weight-bold text-muted">
      Scratch
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Nav>
        <Nav.Link href="/">Signup</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <Routes />
    <>
    </>
    <book />

    <Navbar />
    </div>
  );
}

export default App;
