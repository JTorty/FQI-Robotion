import './style/legend.css';
import Status from './status';
import Stack from "@mui/material/Stack";

function Legend() {
    return (
        <div style={{paddingLeft: "40px"}}>
            <div className="on-line"></div>
            <Stack direction="row" spacing={7}>
                <Status type="operative" />
                <Status type="idle" />
                <Status type="offline" />
            </Stack>
        </div>
    )
}

export default Legend;