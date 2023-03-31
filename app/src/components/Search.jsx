import { Autocomplete, TextField, Button, Stack } from '@mui/material';
import { gql,  useQuery } from 'urql';

let query = gql`
query {
    gifs(distinct_on: category) {
      category
    }
}`

export default function Search(props) {
    let [result, reexecuteQuery] = useQuery({query});
    
    let { data, fetching, error } = result;
    

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    
    return (
        <Stack spacing={2} direction="row">
            <Autocomplete
                disablePortal
                id="categories-combo"
                onChange={(event, newValue) => { props.onSearchChange(newValue)}}
                options={result.data.gifs.map(val => val.category)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Category" />}
            />
        </Stack>
    );
}