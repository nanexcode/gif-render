import { createClient, Provider } from 'urql';
import {Autocomplete, TextField, Button, Stack} from '@mui/material';
import Gifs from "./component/Gifs";

let client = createClient({
  url: 'http://localhost:8080/v1/graphql',
});

const categories = [
  {label: 'cats'},
  {label: 'dogs'},
  {label: 'monkeys'}
];

function App() {
  return (
    <Provider value={client}>
      <div style={{ margin: 24 }}>
        <Stack spacing={2} direction="row">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categories}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
          <Button variant="contained">Search</Button>
        </Stack>

        <Gifs />
      </div>
    </Provider>
  )
}

export default App