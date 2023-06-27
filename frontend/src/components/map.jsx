import './style/map.css';
import Grid from "./grid";
import RobotMap from './robotMap';
import Stack from "@mui/material/Stack";

function Map(props) {
    return (
        <div>
            <Stack alignItems="flex-start">
                <RobotMap color="white" isVisible={props.areRobotsVisible.isWhiteRobotVisible} position={{ latitude: {pixels: 10}, longitude: {pixels: 10} }}/>
                <RobotMap color="green" isVisible={props.areRobotsVisible.isGreenRobotVisible} position={{ latitude: {pixels: 25}, longitude: {pixels: 200} }}/>
                <RobotMap color="turquoise"isVisible={props.areRobotsVisible.isTurquoiseRobotVisible} position={{ latitude: {pixels: 50}, longitude: {pixels: 25} }}/>
                <RobotMap color="black" isVisible={props.areRobotsVisible.isBlackRobotVisible} position={{ latitude: {pixels: 150}, longitude: {pixels: 250} }}/>
                <RobotMap color="brown" isVisible={props.areRobotsVisible.isBrownRobotVisible} position={{ latitude: {pixels: 250}, longitude: {pixels: 700} }}/>
                <RobotMap color="yellow" isVisible={props.areRobotsVisible.isYellowRobotVisible} position={{ latitude: {pixels: 300}, longitude: {pixels: 470} }}/>
                <RobotMap color="orange" isVisible={props.areRobotsVisible.isOrangeRobotVisible} position={{ latitude: {pixels: 250}, longitude: {pixels: 250} }}/>
                <RobotMap color="red" isVisible={props.areRobotsVisible.isRedRobotVisible} position={{ latitude: {pixels: 350}, longitude: {pixels: 650} }}/>
                <RobotMap color="pink" isVisible={props.areRobotsVisible.isPinkRobotVisible} position={{ latitude: {pixels: 450}, longitude: {pixels: 25} }}/>
                <RobotMap color="blue" isVisible={props.areRobotsVisible.isBlueRobotVisible} position={{ latitude: {pixels: 210}, longitude: {pixels: 50} }}/>
            </Stack>
            {props.hasGrid &&
            <Grid width={60} height={38} rows={10} columns={14} cellSize={4.3} margin={{x: 0, y: -1.7}} hasCoordinates={true} scale={0.05} startingLat={26.65} startingLon={14.6} offsetLat={1} offsetLon={1} fontSize="0.8vw"/>
            }
            <img src={props.src} className="map" alt="map" />
        </div>
    )
}

export default Map;