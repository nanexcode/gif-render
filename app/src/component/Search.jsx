import { Autocomplete, TextField, Button, Stack } from '@mui/material';
import { GiftService } from '../services/Gift.service';

const categories = [
    {label: 'cats'},
    {label: 'dogs'},
    {label: 'monkeys'}
];

export default function Search() {
    return (
        <Stack spacing={2} direction="row">
            <Autocomplete
                disablePortal
                id="categories-combo"
                options={categories}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Category" />}
            />
            <Button variant="contained">Search</Button>
        </Stack>
    );
}