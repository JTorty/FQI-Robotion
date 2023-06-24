import './style/map.css';
import Grid from "./grid";
import RobotMap from './robotMap';

function Map(props) {
    return (
        <div>
            <RobotMap color="white" isVisible={props.areRobotsVisible.isWhiteRobotVisible} position={{ latitude: 41.404222, longitude: 2.173861 }}/>
            <RobotMap color="green" isVisible={props.areRobotsVisible.isGreenRobotVisible} position={{ latitude: 200.404222, longitude: 2.173861 }}/>
            <RobotMap color="turquoise"isVisible={props.areRobotsVisible.isTurquoiseRobotVisible} position={{ latitude: 92.404222, longitude: 2.173861 }}/>
            <RobotMap color="black" isVisible={props.areRobotsVisible.isBlackRobotVisible} position={{ latitude: 144.404222, longitude: 2.173861 }}/>
            <RobotMap color="brown" isVisible={props.areRobotsVisible.isBrownRobotVisible} position={{ latitude: 41.404222, longitude: 112.173861 }}/>
            <RobotMap color="yellow" isVisible={props.areRobotsVisible.isYellowRobotVisible} position={{ latitude: 141.404222, longitude: 112.173861 }}/>
            <RobotMap color="orange" isVisible={props.areRobotsVisible.isOrangeRobotVisible} position={{ latitude: 41.404222, longitude: 222.173861 }}/>
            <RobotMap color="red" isVisible={props.areRobotsVisible.isRedRobotVisible} position={{ latitude: 341.404222, longitude: 32.173861 }}/>
            <RobotMap color="pink" isVisible={props.areRobotsVisible.isPinkRobotVisible} position={{ latitude: 441.404222, longitude: 2.173861 }}/>
            <RobotMap color="blue" isVisible={props.areRobotsVisible.isBlueRobotVisible} position={{ latitude: 441.404222, longitude: 102.173861 }}/>
            {props.hasGrid &&
            <Grid width={60} height={38} rows={7} columns={12} cellSize={5.5} margin={{x: -2, y: -0.4}} hasCoordinates={true} gap={5} startingLat={15} startingLon={26} fontSize="0.8vw"/>
            }
            <img src={props.src} className="map" alt="map" />
        </div>
    )
}

export default Map;