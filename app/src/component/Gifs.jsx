import { gql,  useQuery } from 'urql';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

let query = gql`
{
  gifs(limit: 9, offset: 10, where: {category: {_eq: "monkey"}}) {
    id
    url,
    category
  }
}`


export default function Gifs() {
      let [result, reexecuteQuery] = useQuery({
        query,
      });
    
      let { data, fetching, error } = result;
    
      if (fetching) return <p>Loading...</p>;
      if (error) return <p>Oh no... {error.message}</p>;
    
      console.log({ data })
      return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {data.gifs.map((item) => (
            <ImageListItem key={item.img}>
            <img
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
            />
            </ImageListItem>
        ))}
        </ImageList>
      );
}