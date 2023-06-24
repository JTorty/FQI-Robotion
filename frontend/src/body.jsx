import './style/body.css';
import RobotProfile from './components/robotProfile';
import Stack from '@mui/material/Stack';
import Legend from "./components/legend";
import Map from "./components/map";
import mapImg from './assets/map.jpg';
import Filters from "./components/filters";
import {useState} from "react";

function Body() {
  const [isWhiteRobotVisible, setIsWhiteRobotVisible] = useState(true);
  const [isBlackRobotVisible, setIsBlackRobotVisible] = useState(true);
  const [isBlueRobotVisible, setIsBlueRobotVisible] = useState(true);
  const [isBrownRobotVisible, setIsBrownRobotVisible] = useState(true);
  const [isGreenRobotVisible, setIsGreenRobotVisible] = useState(true);
  const [isOrangeRobotVisible, setIsOrangeRobotVisible] = useState(true);
  const [isPinkRobotVisible, setIsPinkRobotVisible] = useState(true);
  const [isRedRobotVisible, setIsRedRobotVisible] = useState(true);
  const [isTurquoiseRobotVisible, setIsTurquoiseRobotVisible] = useState(true);
  const [isYellowRobotVisible, setIsYellowRobotVisible] = useState(true);

  const [isGridChecked, setIsGridChecked] = useState(false);
  const [isPositionChecked, setIsPositionChecked] = useState(false);
  const [isStatusChecked, setIsStatusChecked] = useState(false);
  const [isBatteryChecked, setIsBatteryChecked] = useState(false);

  const checkBoxes = (labelId) => () => {
    if (labelId.includes(0)) {
        isGridChecked ? setIsGridChecked(false) : setIsGridChecked(true);
    } else if (labelId.includes(1)) {
        isPositionChecked ? setIsPositionChecked(false) : setIsPositionChecked(true);
    } else if (labelId.includes(2)) {
        isStatusChecked ? setIsStatusChecked(false) : setIsStatusChecked(true);
    } else if (labelId.includes(3)) {
        isBatteryChecked ? setIsBatteryChecked(false) : setIsBatteryChecked(true);
      }
  }

  return (
    <div className="main">

      <Stack spacing={'3.5vw'}>
        <RobotProfile model="S-01" color="white" setIsWhiteRobotVisible={setIsWhiteRobotVisible}/>
        <RobotProfile model="S-02" color="green" setIsGreenRobotVisible={setIsGreenRobotVisible}/>
        <RobotProfile model="S-03" color="turquoise" setIsTurquoiseRobotVisible={setIsTurquoiseRobotVisible}/>
        <RobotProfile model="S-04" color="black" setIsBlackRobotVisible={setIsBlackRobotVisible}/>
        <RobotProfile model="S-05" color="brown" setIsBrownRobotVisible={setIsBrownRobotVisible}/>
      </Stack>

      <Stack direction="column" spacing={'1.5vw'}>
        <Legend />
        <Map src={mapImg} hasGrid={isGridChecked} hasPosition={isPositionChecked} hasStatus={isStatusChecked} hasBattery={isBatteryChecked} areRobotsVisible={{isWhiteRobotVisible, isBlackRobotVisible, isBlueRobotVisible, isBrownRobotVisible, isGreenRobotVisible, isOrangeRobotVisible, isPinkRobotVisible, isRedRobotVisible, isTurquoiseRobotVisible, isYellowRobotVisible}}/>
        <Filters list={['grid', 'position', 'status', 'battery']} checkBoxes={checkBoxes}/>
      </Stack>

      <Stack spacing={'3.5vw'}>
        <RobotProfile model="S-06" color="yellow" setIsYellowRobotVisible={setIsYellowRobotVisible}/>
        <RobotProfile model="S-07" color="orange" setIsOrangeRobotVisible={setIsOrangeRobotVisible}/>
        <RobotProfile model="S-08" color="red" setIsRedRobotVisible={setIsRedRobotVisible}/>
        <RobotProfile model="S-09" color="pink" setIsPinkRobotVisible={setIsPinkRobotVisible}/>
        <RobotProfile model="S-10" color="blue" setIsBlueRobotVisible={setIsBlueRobotVisible}/>
      </Stack>

    </div>
  );
}

export default Body;
