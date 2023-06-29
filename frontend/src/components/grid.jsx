import './style/grid.css';
import Stack from "@mui/material/Stack";

function Grid(props) {
    const cellSize = props.cellSize ? props.cellSize : Math.sqrt(props.width);
    const fontSize = props.fontSize ? props.fontSize : '1vw';
    const offsetLat = props.offsetLat ? props.offsetLat : 0;
    const offsetLon = props.offsetLon ? props.offsetLon : 0;
    const decimals = props.scale.toString().split('.')[1]?.length || 0;
    const digits = props.scale.toString().replace('.', '').length || 0;
    
    return (
        <div className="grid">
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                width: `${props.width}vw`,
                height: `${props.height}vw`,
                position: "absolute",
                zIndex: 50,
                overflow: "hidden"
            }}>
                <div className="grid-container" style={{
                    gridTemplateColumns: `repeat(${props.columns}, ${cellSize}vw)`,
                    gridTemplateRows: `repeat(${props.rows}, ${cellSize}vw)`,
                    margin: `${props.margin.y}vw ${props.margin.x}vw`
                }}>
                    {Array.from({length: props.rows * props.columns}, (_, index) => (
                        <div key={index} className="grid-item"></div>
                        ))}
                </div>
            </div>
            {props.hasCoordinates &&
                <div className="grid-coordinates" style={{
                    width: `calc(${props.width}vw + ${fontSize} + 0.5vw)`,
                    height: `calc(${props.height}vw + ${fontSize} + 0.5vw)`,
                    marginLeft: `calc(-${fontSize} - 0.4 * ${digits}vw)`,
                    fontSize: `${fontSize}`,
                    position: 'absolute'
                }}>
                    <Stack className="grid-coordinates-y" direction="column-reverse"
                        spacing={`calc(${cellSize}vw - ${fontSize}*1.3)`}
                        sx={{marginBottom: `calc(${cellSize + props.margin.y}vw + (${fontSize} + ${0.1 * digits}vw))`}}
                        >
                        {Array.from({length: props.rows - offsetLat}, (_, index) => (
                            <div key={index} className="coordinate-y" style={{transform: 'rotate(-90deg)'}}>{(props.startingLat + props.scale * (index + offsetLat)).toFixed(decimals)}"</div>
                            ))}
                    </Stack>
                    <Stack className="grid-coordinates-x" direction="row" alignItems="flex-end"
                        spacing={`calc(${cellSize}vw - (${fontSize} + ${0.42 * digits}vw))`}
                        sx={{marginLeft: `calc(${cellSize + props.margin.x}vw + (${fontSize} * 0.75 - ${0.65 * digits}vw))`}}
                    >
                        {Array.from({length: props.columns - offsetLon}, (_, index) => (
                            <div key={index} className="coordinate-x">{(props.startingLon + props.scale * (index + offsetLon)).toFixed(decimals)}"</div>
                        ))}
                    </Stack>
                </div>
            }
        </div>
    )
}

export default Grid;