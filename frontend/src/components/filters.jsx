import './style/filters.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {styled} from '@mui/material/styles';


const WhiteCheckbox = styled(Checkbox)(() => ({
    color: '#fff',
    '&.Mui-checked': {
        color: '#fff',
    },
}));

export default function Filters() {
    const [visible, setVisible] = React.useState('none');
    const [checked, setChecked] = React.useState([0]);

    const labelName = ['grid', 'position', 'status', 'battery'];

    const open = visible === "none";
    
    const handleClick = () => {
        if (visible === "none") {
            setVisible('block');
        } else {
            setVisible('none');
        }
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div style={{paddingRight: "40px"}}>
            <Stack direction="row" justifyContent="flex-end">
                <Button
                    id="filters-button"
                    aria-controls={open ? 'filters-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon/>}
                >
                    Filters
                </Button>
                <List id="filters-list" sx={{display: `${visible}`, width: '100%', maxWidth: 360, bgcolor: '#3D43BD'}}>
                    {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                            <ListItem
                                key={value}
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon>
                                        <WhiteCheckbox
                                            size="small"
                                            edge="start"
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{'aria-labelledby': labelId}}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={labelName[value]} disableTypography
                                                  sx={{color: '#fff', fontSize: '12px'}}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Stack>
        </div>
    );
}