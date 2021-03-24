import React, {useState} from 'react';
import {Box, Button, Card, makeStyles, TextareaAutosize, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {addComment} from '../actions';

const useStyles = makeStyles(theme => ({
    commentContainer: {
        marginTop: theme.spacing(8),
    },
    commentsLabel: {
        marginBottom: theme.spacing(1)
    },
    commentWrapper: {
        display: 'grid',
        gridTemplateColumns: '40px auto',
        gap: '20px',
        '&:not(last-child)': {
            marginBottom: theme.spacing(3)
        }
    },
    commentAvatar: {
        borderRadius: '50%',
        backgroundColor: '#3f51b5',
        color: 'white',
        textAlign: 'center',
        fontSize: '30px',
        lineHeight: '40px',
        width: '40px',
        height: '40px'
    },
    commentAuthor: {
        fontWeight: 'bold'
    },
    editorField: {
        fontSize: '14px',
        border: 'none',
        padding: theme.spacing(1),
        resize: 'vertical',
        width: '100%',
        '&:focus': {
            outline: 'none'
        }
    },
    saveButton: {
        marginTop: theme.spacing(1)
    }

}));

const Comments = ({commentsList, cardId, listId, dispatch}) => {

    const classes = useStyles();

    const [comment, setComment] = useState('');
    const [editMode, setEditMode] = useState(false);

    const saveComment = (text) => {
        if (text) {
            dispatch(addComment(cardId, listId, text));
        }
        setComment('');
        setEditMode(false);
    }

    return (
            <>
                <Box className={classes.commentContainer}>
                    <Typography className={classes.commentsLabel}>
                        Comments
                    </Typography>
                    <Box className={classes.commentWrapper}>
                        <Box className={classes.commentAvatar}>U</Box>
                        <div>
                            <Card>
                                <TextareaAutosize
                                        aria-label="minimum height"
                                        rowsMin={3}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Write your comment"
                                        className={classes.editorField}
                                        onFocus={() => setEditMode(true)}
                                        onBlur={() => setEditMode(false)}
                                />
                            </Card>
                            {
                                editMode &&
                                        <Button onMouseDown={() => saveComment(comment)}
                                                className={classes.saveButton}
                                                variant="contained"
                                        >
                                            Save
                                        </Button>
                            }
                        </div>
                    </Box>
                    {
                        commentsList &&
                                commentsList.slice(0).reverse().map((comment, i) => (
                                        <Box key={i} className={classes.commentWrapper}>
                                            <Box className={classes.commentAvatar}>U</Box>
                                            <Typography>
                                                <Box className={classes.commentAuthor}
                                                     component="span"
                                                >
                                                    User
                                                </Box> {comment}
                                            </Typography>
                                        </Box>
                                ))
                    }
                </Box>
            </>
    );
};

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(Comments);
