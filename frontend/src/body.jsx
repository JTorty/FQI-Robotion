import './style/body.css';
import RobotProfile from './components/robotProfile';
import Map from './components/map';
import Stack from '@mui/material/Stack';


function Body() {
  return (
    <div className="main">
      <Stack spacing={5}> 
        <RobotProfile color="white" />
        <RobotProfile color="green" />
        <RobotProfile color="turquoise" />
        <RobotProfile color="black" />
        <RobotProfile color="brown" />
      </Stack>
      <Map />
      <Stack spacing={5}>
        <RobotProfile color="yellow" />
        <RobotProfile color="orange" />
        <RobotProfile color="red" />
        <RobotProfile color="pink" />
        <RobotProfile color="blue" />
      </Stack>
    </div>
  );
}

export default Body;
