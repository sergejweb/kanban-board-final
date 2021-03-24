import React from 'react';
import {Card, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    popupWrapper: {
        position: 'fixed',
        zIndex: 1000,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#00000077'
    },
    popupWrapperClose: {
        position: 'absolute',
        zIndex: 1001,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    popupCard: {
        maxWidth: '768px',
        background: '#f4f5f7',
        width: 'calc(100% - 20px)',
        maxHeight: 'calc(90vh - 40px)',
        minHeight: '600px',
        position: 'absolute',
        zIndex: 1002,
        top: '80px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        overflowY: 'auto'
    }
}));

const PopupContainer = ({closeHandler, children}) => {

    const classes = useStyles();

    return (
            <div className={classes.popupWrapper}>
                <div className={classes.popupWrapperClose}
                     onClick={() => closeHandler()}
                />
                <Card className={classes.popupCard}>
                    {children}
                </Card>
            </div>
    );
};

export default PopupContainer;
