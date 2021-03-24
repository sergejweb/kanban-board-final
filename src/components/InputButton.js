import React, {useState} from 'react';
import {Box, Button, Card, CardActionArea, CardContent, makeStyles, Typography} from '@material-ui/core';

import {connect} from 'react-redux';
import {addCard, addList} from '../actions/';

const useStyle = makeStyles(theme => ({
    inputButton: {
        border: 'none',
        borderRadius: '4px',
        padding: theme.spacing(1, 2),
        resize: 'vertical',
        width: '100%',
        '&:focus': {
            border: 'none',
            outline: 'none'
        },
    },
    inputWrapper: {
        padding: theme.spacing(1, 2),
        position: 'relative'
    },
    buttonSet: {
        gap: '5px',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
        position: 'absolute',
        top: 'calc(100% + 10px)',
        width: '100%'
    },
    acceptBtn: {
        background: '#3f51b5',
        color: 'white',
        '&:hover': {

        }
    },
    smallerBtn: {
        minWidth: theme.spacing(5)
    },
}));


const InputButton = ({dispatch, addAsCard, listId}) => {

    const [buttonState, setButtonState] = useState(false);
    const [text, setText] = useState('');

    const handleAddItem = () => {
        if (text) {
            if (addAsCard) {
                dispatch(addCard(listId, text));
            } else {
                dispatch(addList(text));
            }
            setText('');
            setButtonState(false);
        }
    };

    const classes = useStyle();

    return (
            <>
                {buttonState
                        ?
                        <CardContent className={classes.inputWrapper}>
                            <Card>
                                <textarea
                                        onChange={(e) => setText(e.currentTarget.value)}
                                        placeholder="Add title here..."
                                        className={classes.inputButton}
                                        value={text}
                                        autoFocus
                                        rows="3"
                                />
                            </Card>
                            <Box className={classes.buttonSet}
                                    display="flex"
                            >
                                <Button className={classes.acceptBtn}
                                        onClick={handleAddItem}
                                        variant="contained"
                                        color="primary"
                                >
                                    Add {addAsCard ? 'card' : 'list'}
                                </Button>
                                <Button onClick={() => setButtonState(false)}
                                        className={classes.smallerBtn}
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                >
                                    &times;
                                </Button>
                            </Box>
                        </CardContent>
                        :
                        <CardActionArea
                                onClick={() => setButtonState(true)}
                                className={classes.inputWrapper}
                        >
                            <Typography style={addAsCard ? {color: 'rgba(0, 0, 0, 0.54)'} : {color: 'rgba(250, 250, 250, 0.84)'}}>
                                + Add new {addAsCard ? 'card' : 'list'}
                            </Typography>
                        </CardActionArea>

                }
            </>
    );
};

export default connect()(InputButton);
