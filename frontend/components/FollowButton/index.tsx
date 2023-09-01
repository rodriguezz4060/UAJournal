import React from 'react';
import stykes from './FollowButton.module.scss'
import AddIcon from "@mui/icons-material/AddOutlined";
import CheckIcon from '@mui/icons-material/CheckOutlined';
import {Button} from "@material-ui/core";

export const FollowButton: React.FC = () => {
    const [followed, setFollowed] = React.useState(false);
    return (
        <Button onClick={() => setFollowed(!followed)} variant="contained"
                style={{minWidth: 30, height: 35, width: 35}}>
            {!followed ? <AddIcon/> : <CheckIcon style={{color: '#2ea83a', fontSize: 20}}/>}
        </Button>
    );
}