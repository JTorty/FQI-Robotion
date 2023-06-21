import './style/body.css';
import RobotProfile from './components/robotProfile';
import Stack from '@mui/material/Stack';
import Legend from "./components/legend";
import Map from "./components/map";
import mapImg from './assets/map.jpg';
import Filters from "./components/filters";

function Body() {
  return (
    <div className="main">

      <Stack spacing={'3.5vw'}>
        <RobotProfile model="S-01" color="white" />
        <RobotProfile model="S-02" color="green" />
        <RobotProfile model="S-03" color="turquoise" />
        <RobotProfile model="S-04" color="black" />
        <RobotProfile model="S-05" color="brown" />
      </Stack>

      <Stack direction="column" spacing={'1.5vw'}>
        <Legend />
        <Map src={mapImg} hasGrid={true} hasPosition={true} hasStatus={true} hasBattery={true} />
        <Filters list={['grid', 'position', 'status', 'battery']} />
      </Stack>

      <Stack spacing={'3.5vw'}>
        <RobotProfile model="S-06" color="yellow" />
        <RobotProfile model="S-07" color="orange" />
        <RobotProfile model="S-08" color="red" />
        <RobotProfile model="S-09" color="pink" />
        <RobotProfile model="S-10" color="blue" />
      </Stack>

    </div>
  );
}

export default Body;
