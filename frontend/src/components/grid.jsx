import './style/grid.css';
import Stack from "@mui/material/Stack";

function Grid(props) {
    const cellSize = props.cellSize ? props.cellSize : Math.sqrt(props.width);
    const fontSize = props.fontSize ? props.fontSize : '1vw';
    const gap = props.gap ? props.gap : 1;
    
    return (
        <div className="grid">
            <div style={{
                width: `${props.width}vw`,
                height: `${props.height}vw`,
                position: "absolute",
                zIndex: 90,
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
                    marginLeft: `calc(-${fontSize} - 0.5vw)`,
                    fontSize: `${fontSize}`,
                    position: 'absolute'
                }}>
                    <Stack className="grid-coordinates-y" direction="column-reverse"
                        spacing={`calc(${cellSize * gap}vw - ${fontSize}*1.2)`}
                        sx={{marginBottom: `calc(${cellSize - props.margin.y}vw + ${fontSize}*0.35)`}}
                        >
                        {Array.from({length: Math.floor((props.rows - 1) / gap) + 1}, (_, index) => (
                            <div key={index} className="coordinate-y" style={{transform: 'rotate(-90deg)'}}>{props.startingLat + index}"</div>
                            ))}
                    </Stack>
                    <Stack className="grid-coordinates-x" direction="row" alignItems="flex-end"
                        spacing={`calc(${cellSize * gap}vw - ${fontSize}*1.4)`}
                        sx={{marginLeft: `calc(${cellSize + props.margin.x}vw - ${fontSize}*0.35)`}}
                    >
                        {Array.from({length: Math.floor((props.columns - 1) / gap) + 1}, (_, index) => (
                            <div key={index} className="coordinate-x">{props.startingLon + index}"</div>
                        ))}
                    </Stack>
                </div>
            }
        </div>
    )
}

export default Grid;