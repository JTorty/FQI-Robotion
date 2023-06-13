import './style/map.css';
import Legend from './legend';
import map from '../assets/map.jpg';
import Filters from './filters';
import Stack from "@mui/material/Stack";

function Map() {
    return (
        <Stack direction="column" spacing={3}>
            <Legend />
            <img src={map} className="map" alt="map" />
            <Filters />
        </Stack>
    )
}

export default Map;