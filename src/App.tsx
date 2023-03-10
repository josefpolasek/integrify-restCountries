/* LIBRARIES */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, /* Switch */ } from 'react-router-dom';

/* COMPONENTS */
import CountriesTable from './components/CountriesTable';
import Navbar from './components/Navbar';

function App() {
  // state variable to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  // function to update the searchQuery state 
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    // using Router for switching between CountriesTable.tsx and SingleCountry.tsx
    <div>
      <Navbar onSearch={handleSearch} />

      <CountriesTable searchQuery={searchQuery} />
    </div>
  );
}

// {/* <Router>
//       <div>
//         <Navbar onSearch={handleSearch} />

//         <Switch>
//           <Route path="/country/">
//             <h1>Single Country</h1>
//           </Route>

//           <Route path="/">
//             <CountriesTable searchQuery={searchQuery} />
//           </Route>
//         </Switch>

//       </div>
//     </Router> */}

export default App;
