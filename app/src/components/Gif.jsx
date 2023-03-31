import React from 'react';
import { gql,  useQuery } from 'urql';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

let query = gql`
  query($limit: Int!, $offset: Int!, $category: String!) {
    gifs(limit: $limit, offset: $offset, where: {category: {_eq: $category}}) {
      id
      url,
      category
    }
  }`

function Gifs(props) {
  const [result] = useQuery({
    query: query,
    variables: {
      limit: 9,
      offset: Math.floor(Math.random() * 1000),
      category: props.searchTerm,
    },
  });
  
  const { data, fetching, error } = result;

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.gifs || data.gifs.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div style={{ margin: 24 }}>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {data.gifs.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default Gifs;
