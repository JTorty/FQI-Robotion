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

// import React, { useEffect, useState } from 'react';
// import './style/map.css';
// import Grid from './grid';
// import RobotMap from './robotMap';
// import Stack from '@mui/material/Stack';

// function Map(props) {
//   const [robotPositions, setRobotPositions] = useState([]);

//   useEffect(() => {
//     
//     fetchRobotPositions();
//     
//     const timer = setInterval(fetchRobotPositions, 1000);
//    
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   const fetchRobotPositions = () => {
//     fetch('http://127.0.0.1:8000/getallrobots')
//       .then((response) => response.json())
//       .then((data) => setRobotPositions(data))
//       .catch((error) => console.error('Error fetching robot positions:', error));
//   };

//   return (
//     <div>
//       <Stack alignItems="flex-start">
//         {robotPositions.map((robot) => (
//           <RobotMap
//             key={robot.model}
//             color={getColorForRobot(robot.model)}
//             isVisible={props.areRobotsVisible[getColorForRobot(robot.model)]}
//             position={{
//               latitude: { pixels: 600 - robot.position.latitude.pixel },
//               longitude: { pixels: robot.position.longitude.pixel },
//             }}
//             hasFilters={props.hasFilters}
//           />
//         ))}
//       </Stack>
//       {/* Render the grid */}
//       {props.hasFilters.grid && (
//         <Grid
//           width={60}
//           height={38}
//           rows={10}
//           columns={14}
//           cellSize={4.3}
//           margin={{ x: 0, y: -1.7 }}
//           hasCoordinates={true}
//           scale={0.05}
//           startingLat={26.65}
//           startingLon={14.6}
//           offsetLat={1}
//           offsetLon={1}
//           fontSize="0.8vw"
//         />
//       )}
//       <img src={props.src} className="map" alt="map" />
//     </div>
//   );
// }

// function getColorForRobot(model) {
//   switch (model) {
//     case 'S-01':
//       return 'white';
//     case 'S-02':
//       return 'green';
//     case 'S-03':
//       return 'turquoise';
//     case 'S-04':
//       return 'black';
//     case 'S-05':
//       return 'brown';
//     case 'S-06':
//       return 'yellow';
//     case 'S-07':
//       return 'orange';
//     case 'S-08':
//       return 'red';
//     case 'S-09':
//       return 'pink';
//     case 'S-10':
//       return 'blue';
//     default:
//       return 'white';
//   }
// }

// export default Map;