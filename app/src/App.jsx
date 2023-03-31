import React, { Component, useState } from 'react';
import { createClient, Provider, gql, useQuery } from 'urql';
import { Autocomplete, TextField, Button, Stack } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


let client = createClient({
  url: 'http://localhost:8080/v1/graphql',
});

// Hardcoded list of categories to simplify the solution
const categories = [
  {label: 'cat'},
  {label: 'dog'},
  {label: 'elephant'},
  {label: 'lion'},
  {label: 'monkey'},
];

// predefined query
let search = `
  query($limit: Int!, $offset: Int!, $category: String!) {
    gifs(limit: $limit, offset: $offset, where: {category: {_eq: $category}}) {
      id
      url,
      category
    }
  }`


function Gif() {
  
  const [data, setData] = useState(null);
  const [category, setCategory] = useState(null);

  const onClick = () => {
    const limit = 9;
    const offset = Math.floor(Math.random() * 1000);
    
    client.query(
      search, {limit, offset, category}
    )
    .toPromise()
    .then(result => {
      setData(result.data);
    });

  };

  return( 
      <Provider value={client}>
        <div style={{ margin: 24 }}>
        <Stack spacing={2} direction="row">
              <Autocomplete
                  disablePortal
                  id="categories-combo"
                  onChange={(event, newValue) => { setCategory(newValue.label)}}
                  options={categories}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Category" />}
              />
              <Button variant="contained" onClick={ onClick }>
                Search
              </Button>
          </Stack>
          { data && (
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            { data.gifs.map((item) => (
                <ImageListItem key={item.img}>
                <img
                    src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
            </ImageList>
          )}
        </div>
      </Provider>
  )
}

function App() {
  return <Provider value={client}>
    <Gif/>
  </Provider>
}

export default App