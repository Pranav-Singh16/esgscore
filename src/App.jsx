// import React, { Suspense } from 'react';
// import { RecoilRoot } from 'recoil'; // Import RecoilRoot
// import Home from "./Pages/Home";

// function App() {
//   return (
//     <RecoilRoot> {/* Wrap your app with RecoilRoot */}
//       <Suspense fallback={<>Loading...</>}>
//         <Home /> {/* Render Home component directly */}
//       </Suspense>
//     </RecoilRoot>
//   );
// }

// export default App;


import React, { Suspense, useEffect } from 'react';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import Home from "./Pages/Home";

function App() {
  useEffect(() => {
    document.title = "Alviridi"; // Set the document title
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <RecoilRoot> {/* Wrap your app with RecoilRoot */}
      <Suspense fallback={<>Loading...</>}>
        <Home /> {/* Render Home component directly */}
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
