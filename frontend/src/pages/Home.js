import react from 'react'; 
import OrganisationBox from '../components/OrganisationBox'; 
import { Grid } from '@mui/material';

const Home = () => {

    const listItems = [1, 2, 3]; 
    return (
        <Grid container spacing={2}>
            {listItems.map(item => <OrganisationBox title={item} />)}
        </Grid>
    )
}

export default Home; 


