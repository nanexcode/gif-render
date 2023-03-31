import React, { useState } from 'react';
import { createClient, Provider } from 'urql';
import Search from './components/Search';
import Gifs from './components/Gif';

let client = createClient({
  url: 'http://localhost:8080/v1/graphql',
});



function App() {

  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchChange(newSearchTerm) {
    if (newSearchTerm != searchTerm) {
      setSearchTerm(newSearchTerm);
    }
  }

  return (
    <div style={{ margin: 128 }}>
      <Provider value={client}>
        <Search onSearchChange={handleSearchChange}/>
        { (searchTerm && searchTerm !== "") && (
            <Gifs searchTerm={searchTerm}/>
          )
        }
      </Provider>
   </div>
  )
}

export default App