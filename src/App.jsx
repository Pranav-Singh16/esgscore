import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import Home from "./Pages/Home";
import Chatbot from './Pages/Chatbot';

function App() {
  return (
    <Router> {/* Wrap your app with BrowserRouter */}
      <RecoilRoot> {/* Wrap your app with RecoilRoot */}
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home component at root path */}
            <Route path="/chatbot" element={<Chatbot />} /> {/* Chatbot component at /chatbot */}
          </Routes>
        </Suspense>
      </RecoilRoot>
    </Router>
  );
}

export default App;
