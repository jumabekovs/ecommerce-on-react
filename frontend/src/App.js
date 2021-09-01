import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Routes from "./Routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="grid-container">
      <Header openMenu={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen((prev) => !prev)}
      />
      <main>
        <Routes />
      </main>
      <footer className="row center">All Rights Reserved</footer>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
