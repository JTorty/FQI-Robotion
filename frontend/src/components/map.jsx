import './style/map.css';
import Grid from "./grid";
import RobotMap from './robotMap';

function Map(props) {
    return (
        <div>
            <RobotMap position={{latitude:41.404222,longitude:2.173861}}/>
            <Grid width={60} height={38} rows={7} columns={12} cellSize={5.5} margin={{x: -2, y: -0.4}} hasCoordinates={true} gap={5} startingLat={15} startingLon={26} fontSize="0.8vw"/>
            <img src={props.src} className="map" alt="map" />
        </div>
    )
}

export default Map;