import './style/robotMap.css';
import Stack from '@mui/material/Stack';
import compassImg from "../assets/icons/compass.png";
import whiteAvatar from '../assets/avatars/map/white_robot.png';
import blackAvatar from '../assets/avatars/map/black_robot.png';
import blueAvatar from '../assets/avatars/map/blue_robot.png';
import brownAvatar from '../assets/avatars/map/brown_robot.png';
import greenAvatar from '../assets/avatars/map/green_robot.png';
import orangeAvatar from '../assets/avatars/map/orange_robot.png';
import pinkAvatar from '../assets/avatars/map/pink_robot.png';
import redAvatar from '../assets/avatars/map/red_robot.png';
import turquoiseAvatar from '../assets/avatars/map/turquoise_robot.png';
import yellowAvatar from '../assets/avatars/map/yellow_robot.png';
import openedEyes from '../assets/avatars/map/eyes/opened_eyes.png';
import halfOpenedEyes from '../assets/avatars/map/eyes/half_opened_eyes.png';
import closedEyes from '../assets/avatars/map/eyes/closed_eyes.png';
import React, { useEffect, useState } from 'react';
import batteryEmptyRedImg from "../assets/icons/battery-empty-red.png";
import batteryFullImg from "../assets/icons/battery-full.png";
import batteryHighImg from "../assets/icons/battery-high.png";
import batteryLowImg from "../assets/icons/battery-low.png";
import batteryMediumImg from "../assets/icons/battery-medium.png";


function RobotMap(props) {

  const [battery, setBattery] = useState(-1);
  const [statusType, setStatusType] = useState("unknown");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://127.0.0.1:8000/getrobot?model=${props.model}`)
        .then(response => response.json())
        .then(data => {
          if (data.battery > -1) {
            setBattery(data.battery);
          }
          if (data.status) {
            setStatusType(data.status);
          }
          if (data.position && data.position.latitude && data.position.longitude) {
            setLatitude(LatCoords(data.position.latitude));
            setLongitude(LonCoords(data.position.longitude));
          }
        })
        .catch(error => {
          console.error('Error fetching battery data:', error);
        });
    };

    const intervalId = setInterval(fetchData, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [props.model]);

    const LatCoords = (coordinates) => {
        const degrees = coordinates.degrees;
        const minutes = coordinates.minutes;
        const seconds = coordinates.seconds.toFixed(2);
        const direction = coordinates.direction = 'E';
        const absDegrees = Math.abs(degrees);
        return `${absDegrees}° ${minutes}' ${seconds}" ${direction}`;
      };
    
    const LonCoords = (coordinates) => {
        const degrees = coordinates.degrees;
        const minutes = coordinates.minutes;
        const seconds = coordinates.seconds.toFixed(2);
        const direction = coordinates.direction = 'N';
        const absDegrees = Math.abs(degrees);
        return `${absDegrees}° ${minutes}' ${seconds}" ${direction}`;
      };


    let avatar = whiteAvatar;
    let accent = "#e8e8e8";

    if (props.color === "black") {
        avatar = blackAvatar;
        accent = "#1f1f1f";
    } else if (props.color === "blue") {
        avatar = blueAvatar;
        accent = "#c9dff2";
    } else if (props.color === "brown") {
        avatar = brownAvatar;
        accent = "#6d592e";
    } else if (props.color === "green") {
        avatar = greenAvatar;
        accent = "#c8f0c6";
    } else if (props.color === "orange") {
        avatar = orangeAvatar;
        accent = "#c86b00";
    } else if (props.color === "pink") {
        avatar = pinkAvatar;
        accent = "#f2c9f2";
    } else if (props.color === "red") {
        avatar = redAvatar;
        accent = "#801e1e";
    } else if (props.color === "turquoise") {
        avatar = turquoiseAvatar;
        accent = "#168978";
    } else if (props.color === "yellow") {
        avatar = yellowAvatar;
        accent = "#fef601";
    }

    let eyes = openedEyes;
    

    let batteryImgSrc;

    if (battery !== -1) {
      if (battery === 0 ) {
        batteryImgSrc = batteryEmptyRedImg;
        eyes = closedEyes;
      } else if (battery <= 25) {
        batteryImgSrc = batteryLowImg;
      } else if (battery <= 50) {
        eyes = halfOpenedEyes;
        batteryImgSrc = batteryMediumImg;
      } else if (battery <= 75) {
        batteryImgSrc = batteryHighImg;
      } else {
        batteryImgSrc = batteryFullImg;
      };
    }   

    const handleStatus = () => {

        if (statusType === 'operative') {
            return '#31BC00';
        } else if (statusType === 'idle') {
            return '#0075CA';
        } else if (statusType === 'offline') {
            return '#7E7E7E';
        }
    };

    const avatarSize = props.size && props.mapSize.width ? `${props.size * props.mapSize.width / 950}px` : '65px';
    const mapWidth = props.mapSize.width ? props.mapSize.width: 950;
    const mapHeight = props.mapSize.height ? props.mapSize.height : 600;

    const handlePopupHeight = () => {
        if (props.hasFilters.position && props.hasFilters.status && props.hasFilters.battery) {
            return 'calc(1.5vw * 2.25)';
        }

        if ((props.hasFilters.position && props.hasFilters.status) ||
            (props.hasFilters.position && props.hasFilters.battery) ||
            (props.hasFilters.status && props.hasFilters.battery)) {
            return 'calc(1.5vw * 1.75)';
        }

        return 'calc(1.5vw)';
    }

    const handleElHeight = () => {
        if (props.hasFilters.position && props.hasFilters.status && props.hasFilters.battery) {
            return '33%';
        }

        if ((props.hasFilters.position && props.hasFilters.status) ||
            (props.hasFilters.position && props.hasFilters.battery) ||
            (props.hasFilters.status && props.hasFilters.battery)) {
            return '50%';
        }

        return '100%';
    }

    return (
<div className="robot-map" style={{
  display: props.isVisible ? 'flex' : 'none',
  paddingTop: `${props.position.latitude.pixels * mapHeight / 600}px`,
  paddingLeft: `calc(${props.position.longitude.pixels * mapWidth / 950}px + (${avatarSize} / 2))`
}}>
  <div className="robot-eyes" style={{ backgroundImage: `url(${eyes})`, width: `calc(${avatarSize}/2.5)`, height: `calc(${avatarSize}/5)`, marginTop: `calc(${avatarSize}/2.5)` }}>
  </div>
  <div className="robot-avatar" style={{ backgroundImage: `url(${avatar})`, width: avatarSize, height: avatarSize }}>
  </div>
  <Stack className="popup-map" direction="column" spacing="0.25vw" sx={{ border: `0.15vw solid ${accent}`, display: props.hasFilters.position || props.hasFilters.status || props.hasFilters.battery ? 'flex' : 'none', marginTop: `calc(${avatarSize}/1.15)`, height: handlePopupHeight() }}>
    <div className="position popup-element" style={{ display: props.hasFilters.position ? 'flex' : 'none', height: handleElHeight() }}>
      <div className="icon-position popup-element-icon" style={{ backgroundImage: `url(${compassImg})` }}></div>
      <div className="position-coordinates popup-element-text">
        <span>{longitude}</span>
        <span>{latitude}</span>
      </div>
    </div>
    <div className="status popup-element" style={{ display: props.hasFilters.status ? 'flex' : 'none', height: handleElHeight() }}>
      <div className="popup-element-icon">
        <div className="icon-status" style={{ backgroundColor: handleStatus() }}></div>
      </div>
      <div className="popup-element-text">
        <span>{statusType}</span>
      </div>
    </div>
    <div className="battery popup-element" style={{ display: props.hasFilters.battery ? 'flex' : 'none', height: handleElHeight() }}>
      <div className="icon-battery popup-element-icon" style={{ backgroundImage: `url(${batteryImgSrc})` }}></div>
      <div className="popup-element-text">
        <span>{battery !== null ? `${battery}%` : 'Loading...'}</span>
      </div>
    </div>
  </Stack>
</div>
    );
}

export default RobotMap;