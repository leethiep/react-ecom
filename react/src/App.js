// import React from "react";
// import Header from "./particals/Header";
// import Container from "./components/Container";
// import { SearchProvider } from "./components/SearchContext";

// const App = () => {
//   return (
//     <div>
//       <SearchProvider>
//         <header>
//           <Header />
//         </header>
//         <main>
//           <Container />
//         </main>
//       </SearchProvider>
//     </div>
//   );
// };

// export default App;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './actions/dataActions';
import Header from "./particals/Header";
import Container from "./components/Container";
import { SearchProvider } from "./components/SearchContext";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div>
      <div>
      <SearchProvider>
        <header>
          <Header />
        </header>
        <main>
          <Container />
        </main>
      </SearchProvider>
    </div>
      
    </div>
  );
}

export default App;