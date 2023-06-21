import './style/map.css';
import Grid from "./grid";

function Map(props) {
    return (
        <div>
            <Grid width={60} height={38} rows={7} columns={12} cellSize={5.5} margin={{x: -2, y: -0.4}} hasCoordinates={true} gap={5} startingLat={15} startingLon={26} fontSize="0.8vw"/>
            <img src={props.src} className="map" alt="map" />
        </div>
    )
}

export default Map;