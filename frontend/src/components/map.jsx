import './style/map.css';
import Grid from "./grid";
import RobotMap from './robotMap';
import Stack from "@mui/material/Stack";
import {useState, useRef, useEffect} from 'react';

function Map(props) {
    const mapEl = useRef(null);
    const [mapSize, setMapSize] = useState({});
    useEffect(() => {
        if (mapEl.current) {
            const {offsetWidth: width, offsetHeight: height} = mapEl.current;
            setMapSize({width, height});
        }
    }, [mapEl]);

  const [robotPositions, setRobotPositions] = useState({
    white: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
    green: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
    turquoise: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
    black: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
    brown: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
    yellow: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
    orange: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
    red: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
    pink: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
    blue: { latitude: { pixels: 1 }, longitude: { pixels: 1 } },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchRobotPositions();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchRobotPositions = async () => {
    try {
      const whiteResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-01');
      const greenResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-02');
      const turquoiseResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-03');
      const blackResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-04');
      const brownResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-05');
      const yellowResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-06');
      const orangeResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-07');
      const redResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-08');
      const pinkResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-09');
      const blueResponse = await fetch('http://127.0.0.1:8000/getrobot?model=S-10');

      if (whiteResponse.ok && greenResponse.ok && turquoiseResponse.ok && blackResponse.ok && brownResponse.ok && yellowResponse.ok && orangeResponse.ok && redResponse.ok && pinkResponse.ok && blueResponse.ok) {
        const whiteData = await whiteResponse.json();
        const greenData = await greenResponse.json();
        const turquoiseData = await turquoiseResponse.json();
        const blackData = await blackResponse.json();
        const brownData = await brownResponse.json();
        const yellowData = await yellowResponse.json();
        const orangeData = await orangeResponse.json();
        const redData = await redResponse.json();
        const pinkData = await pinkResponse.json();
        const blueData = await blueResponse.json();

        const whitePosition = whiteData.position;
        const greenPosition = greenData.position;
        const turquoisePosition = turquoiseData.position;
        const blackPosition = blackData.position;
        const brownPosition = brownData.position;
        const yellowPosition = yellowData.position;
        const orangePosition = orangeData.position;
        const redPosition = redData.position;
        const pinkPosition = pinkData.position;
        const bluePosition = blueData.position;

        setRobotPositions({
          white: {
            latitude: { pixels: whitePosition.latitude.pixel - 33 },
            longitude: { pixels: whitePosition.longitude.pixel - 33 }
          },
          green: {
            latitude: { pixels: greenPosition.latitude.pixel - 33 },
            longitude: { pixels: greenPosition.longitude.pixel - 33 }
          },
          turquoise: {
            latitude: { pixels: turquoisePosition.latitude.pixel - 33 },
            longitude: { pixels: turquoisePosition.longitude.pixel - 33 }
          },
          black: {
            latitude: { pixels: blackPosition.latitude.pixel - 33 },
            longitude: { pixels: blackPosition.longitude.pixel - 33 }
          },
          brown: {
            latitude: { pixels: brownPosition.latitude.pixel - 33 },
            longitude: { pixels: brownPosition.longitude.pixel - 33 }
          },
          yellow: {
            latitude: { pixels: yellowPosition.latitude.pixel - 33 },
            longitude: { pixels: yellowPosition.longitude.pixel - 33 }
          },
          orange: {
            latitude: { pixels: orangePosition.latitude.pixel - 33 },
            longitude: { pixels: orangePosition.longitude.pixel - 33 }
          },
          red: {
            latitude: { pixels: redPosition.latitude.pixel - 33 },
            longitude: { pixels: redPosition.longitude.pixel - 33 }
          },
          pink: {
            latitude: { pixels: pinkPosition.latitude.pixel - 33 },
            longitude: { pixels: pinkPosition.longitude.pixel - 33 }
          },
          blue: {
            latitude: { pixels: bluePosition.latitude.pixel - 33 },
            longitude: { pixels: bluePosition.longitude.pixel - 33 }
          },
        });
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Error fetching robot positions:', error);
    }
  };

    return (
        <div>
            <Stack alignItems="flex-start">
                <RobotMap color="white" isVisible={props.areRobotsVisible.white} size={65} mapSize={mapSize} position={robotPositions.white} hasFilters={props.hasFilters}/>
                <RobotMap color="green" isVisible={props.areRobotsVisible.green} size={65} mapSize={mapSize} position={robotPositions.green} hasFilters={props.hasFilters}/>
                <RobotMap color="turquoise" isVisible={props.areRobotsVisible.turquoise} size={65} mapSize={mapSize} position={robotPositions.turquoise} hasFilters={props.hasFilters}/>
                <RobotMap color="black" isVisible={props.areRobotsVisible.black} size={65} mapSize={mapSize} position={robotPositions.black} hasFilters={props.hasFilters}/>
                <RobotMap color="brown" isVisible={props.areRobotsVisible.brown} size={65} mapSize={mapSize} position={robotPositions.brown} hasFilters={props.hasFilters}/>
                <RobotMap color="yellow" isVisible={props.areRobotsVisible.yellow} size={65} mapSize={mapSize} position={robotPositions.yellow} hasFilters={props.hasFilters}/>
                <RobotMap color="orange" isVisible={props.areRobotsVisible.orange} size={65} mapSize={mapSize} position={robotPositions.orange} hasFilters={props.hasFilters}/>
                <RobotMap color="red" isVisible={props.areRobotsVisible.red} size={65} mapSize={mapSize} position={robotPositions.red} hasFilters={props.hasFilters}/>
                <RobotMap color="pink" isVisible={props.areRobotsVisible.pink} size={65} mapSize={mapSize} position={robotPositions.pink} hasFilters={props.hasFilters}/>
                <RobotMap color="blue" isVisible={props.areRobotsVisible.blue} size={65} mapSize={mapSize} position={robotPositions.blue} hasFilters={props.hasFilters}/>
            </Stack>
            {props.hasFilters.grid &&
            <Grid width={60} height={38} rows={10} columns={14} cellSize={4.3} margin={{x: 0, y: -1.7}} hasCoordinates={true} scale={0.05} startingLat={26.65} startingLon={14.6} offsetLat={1} offsetLon={1} fontSize="0.8vw"/>
            }
            <img src={props.src} className="map" alt="map" ref={mapEl}/>
        </div>
    )
}

export default Map;