import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import CountriesTable from './components/CountriesTable';
import Navbar from './components/Navbar';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Navbar onSearch={setSearchQuery} />
      <CountriesTable searchQuery={searchQuery} />
    </div>
  );
}

export default App;
