import './style/map.css';
import Grid from "./grid";
import RobotMap from './robotMap';
import Stack from "@mui/material/Stack";

function Map(props) {
    return (
        <div>
            <Stack alignItems="flex-start">
                {/*prendere dati da backend per tutte le position qui sotto*/}
                <RobotMap color="white" isVisible={props.areRobotsVisible.white} position={{ latitude: {pixels: 10}, longitude: {pixels: 10} }} hasFilters={props.hasFilters}/>
                <RobotMap color="green" isVisible={props.areRobotsVisible.green} position={{ latitude: {pixels: 25}, longitude: {pixels: 200} }} hasFilters={props.hasFilters}/>
                <RobotMap color="turquoise" isVisible={props.areRobotsVisible.turquoise} position={{ latitude: {pixels: 50}, longitude: {pixels: 25} }} hasFilters={props.hasFilters}/>
                <RobotMap color="black" isVisible={props.areRobotsVisible.black} position={{ latitude: {pixels: 150}, longitude: {pixels: 250} }} hasFilters={props.hasFilters}/>
                <RobotMap color="brown" isVisible={props.areRobotsVisible.brown} position={{ latitude: {pixels: 250}, longitude: {pixels: 700} }} hasFilters={props.hasFilters}/>
                <RobotMap color="yellow" isVisible={props.areRobotsVisible.yellow} position={{ latitude: {pixels: 300}, longitude: {pixels: 470} }} hasFilters={props.hasFilters}/>
                <RobotMap color="orange" isVisible={props.areRobotsVisible.orange} position={{ latitude: {pixels: 250}, longitude: {pixels: 250} }} hasFilters={props.hasFilters}/>
                <RobotMap color="red" isVisible={props.areRobotsVisible.red} position={{ latitude: {pixels: 350}, longitude: {pixels: 650} }} hasFilters={props.hasFilters}/>
                <RobotMap color="pink" isVisible={props.areRobotsVisible.pink} position={{ latitude: {pixels: 450}, longitude: {pixels: 25} }} hasFilters={props.hasFilters}/>
                <RobotMap color="blue" isVisible={props.areRobotsVisible.blue} position={{ latitude: {pixels: 210}, longitude: {pixels: 50} }} hasFilters={props.hasFilters}/>
            </Stack>
            {props.hasFilters.grid &&
            <Grid width={60} height={38} rows={10} columns={14} cellSize={4.3} margin={{x: 0, y: -1.7}} hasCoordinates={true} scale={0.05} startingLat={26.65} startingLon={14.6} offsetLat={1} offsetLon={1} fontSize="0.8vw"/>
            }
            <img src={props.src} className="map" alt="map" />
        </div>
    )
}

export default Map;