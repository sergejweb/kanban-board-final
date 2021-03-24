import React, {useState} from 'react';
import {Button, Card, makeStyles, TextareaAutosize, Typography} from '@material-ui/core';
import {addNewBoard} from '../actions';
import {connect} from 'react-redux';

const useStyles = makeStyles(theme => ({
    boardListItem: {
        padding: theme.spacing(1),
        height: theme.spacing(10),
        transition: 'transform .2s',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    newListItem: {
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'visible',
    },
    editorField: {
        fontSize: '14px',
        border: 'none',
        padding: theme.spacing(1),
        resize: 'vertical',
        width: '100%',
        '&:focus': {
            outline: 'none',
        },
    },
    saveButton: {
        marginTop: theme.spacing(1),
        position: 'absolute',
        top: '100%',
        right: 0
    }
}));

const BoardAddon = ({dispatch}) => {

    const classes = useStyles();

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const newBoardAddon = () => {
        if (title) {
            dispatch(addNewBoard(title));
        }
        setTitle('');
        setEditMode(false);
    };

    return (
            <Card className={`${classes.boardListItem} ${classes.newListItem}`}
                  onClick={() => setEditMode(true)}
            >
                {
                    editMode
                            ?
                            <>
                                <TextareaAutosize
                                        onChange={(e) => setTitle(e.target.value)}
                                        onBlur={() => setEditMode(false)}
                                        className={classes.editorField}
                                        aria-label="minimum height"
                                        autoFocus={true}
                                        value={title}
                                        rowsMin={3}
                                />
                                <Button className={classes.saveButton}
                                        onMouseDown={newBoardAddon}
                                        variant="contained"
                                >
                                    Save
                                </Button>
                            </>
                            :
                            <Typography color="textSecondary"
                                        align="center"
                            >
                                + Add Board!
                            </Typography>
                }
            </Card>
    );
};

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(BoardAddon);
