import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import Home from "./Pages/Home";

function App() {
  return (
    <RecoilRoot> {/* Wrap your app with RecoilRoot */}
      <Suspense fallback={<>Loading...</>}>
        <Home /> {/* Render Home component directly */}
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
