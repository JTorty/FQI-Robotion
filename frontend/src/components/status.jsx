import './style/status.css';
import Stack from "@mui/material/Stack";

function Status(props) {
    let color = "#fff";
    if (props.type === "operative") {
        color = "#31BC00";
    } else if (props.type === "idle") {
        color = "#0075CA";
    } else if (props.type === "offline") {
        color = "#7E7E7E";
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <span className="dot" style={{background: `${color}`}}></span>
            <span className="text">{props.type}</span>
        </Stack>
    )
}

export default Status;