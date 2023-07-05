import './style/popup.css';
import Stack from '@mui/material/Stack';
import compassImg from "../assets/icons/compass.png";
import batteryEmptyRedImg from "../assets/icons/battery-empty-red.png";
import batteryFullImg from "../assets/icons/battery-full.png";
import batteryHighImg from "../assets/icons/battery-high.png";
import batteryLowImg from "../assets/icons/battery-low.png";
import batteryMediumImg from "../assets/icons/battery-medium.png";
import { useEffect, useState } from 'react';

function Popup(props) {
    
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


    let accent = "#e8e8e8";
    let contrast = "#1F344C";

    if (props.color === "black") {
        accent = "#1f1f1f";
        contrast = "#e8e8e8";
    } else if (props.color === "blue") {
        accent = "#c9dff2";
        contrast = "#1F344C";
    } else if (props.color === "red") {
        accent = "#801e1e";
        contrast = "#e8e8e8";
    } else if (props.color === "yellow") {
        accent = "#fef601";
        contrast = "#1F344C";
    } else if (props.color === "pink") {
        accent = "#f2c9f2";
        contrast = "#1F344C";
    } else if (props.color === "turquoise") {
        accent = "#168978";
        contrast = "#e8e8e8";
    } else if (props.color === "orange") {
        accent = "#c86b00";
        contrast = "#1F344C";
    } else if (props.color === "green") {
        accent = "#c8f0c6";
        contrast = "#1F344C";
    } else if (props.color === "brown") {
        accent = "#6d592e";
        contrast = "#e8e8e8";
    }

    let batteryImgSrc;

    if (battery !== -1) {
      if (battery === 0 ) {
        batteryImgSrc = batteryEmptyRedImg;
      } else if (battery <= 25) {
        batteryImgSrc = batteryLowImg;
      } else if (battery <= 50) {
        batteryImgSrc = batteryMediumImg;
      } else if (battery <= 75) {
        batteryImgSrc = batteryHighImg;
      } else {
        batteryImgSrc = batteryFullImg;
      }
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

    return (
        <div style={{display: props.isVisible ? 'flex' : 'none'}}>
        <div className={`popup popup-${props.position}`}
            style={{ borderColor: accent }}>
            <div className="model" style={{ backgroundColor: accent }}>
                <span style={{ color: contrast }}>{props.model}</span>
            </div>
            <Stack className="popup-body" direction="column" spacing="0.45vw">
                <div className="position popup-element">
                    <div className="icon-position popup-element-icon"
                        style={{ backgroundImage: `url(${compassImg})` }}></div>
                    <div className="position-coordinates popup-element-text">
                        <span>{longitude}</span>
                        <span>{latitude}</span>
                    </div>
                </div>
                <div className="status popup-element">
                    <div className="popup-element-icon">
                        <div className="icon-status" style={{ backgroundColor: handleStatus() }}></div>
                    </div>
                    <div className="popup-element-text">
                        <span>{statusType}</span>
                    </div>
                </div>
                <div className="battery popup-element">
                    <div className="icon-battery popup-element-icon"
                        style={{ backgroundImage: `url(${batteryImgSrc})` }}></div>
                    <div className="popup-element-text">
                        <span>{battery !== null ? `${battery}%` : 'Loading...'}</span>
                    </div>
                </div>
            </Stack>
        </div>
            <div className="arrowIcon" style={{ transform: `${props.position === 'left' ? 'rotate(135deg)' : 'rotate(315deg)'}`, margin: `${props.position === 'left' ? '-1.25vw -1.9vw' : '-1.25vw 6.5vw'}` }}></div>
        </div>
    );
}

export default Popup;