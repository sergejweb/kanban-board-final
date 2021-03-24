import React, {Fragment, useState} from 'react';
import {Box, Card, CardContent, makeStyles, TextareaAutosize, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {editCardDescription, editCardTitle} from '../actions';
import CardInnerList from './cardInnerList';
import Comments from './Comments';

const useStyles = makeStyles(theme => ({
    cardDetailsTitle: {
        background: '#f4f5f7',
        fontSize: '26px',
        border: 'none',
        marginBottom: theme.spacing(1),
        '&:focus': {
            outline: 'none'
        },
        '&::placeholder': {
            color: 'black'
        }
    },
    cardDetailsSubTitle: {
        marginBottom: theme.spacing(3)
    },
    cardDetailsLabel: {
        marginBottom: theme.spacing(.5)
    },
    cardDetailsDescription: {
        minHeight: '70px',
        fontSize: '14px',
        border: 'none',
        height: 'auto',
        resize: 'none',
        width: '100%',
        '&:focus': {
            outline: 'none'
        },
        '&:placeholder': {
            color: 'black'
        }
    }
}));

const TaskCardDetails = ({lists, cardId, listId, dispatch}) => {

    const classes = useStyles();

    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const getStateDescription = (text) => {
        setDescription(text);
    }

    const setStateDescription = (id, listId) => {
        dispatch(editCardDescription(id, listId, description));
    }

    const getStateTitle = (title) => {
        setTitle(title);
    }

    const setStateTitle = (id, listId) => {
        dispatch(editCardTitle(id, listId, title));
    }

    return (
            <>
                {lists.boards[lists.currentBoard].boardLists.map(list => (
                    <Fragment key={list.id}>
                        {
                            list.cards.map(card => (
                                <Fragment key={card.id}>
                                    {
                                        card.id === cardId
                                            ?
                                            <>
                                                <CardContent>
                                                    <input onChange={(e) => getStateTitle(e.target.value)}
                                                           onBlur={() => setStateTitle(card.id, list.id)}
                                                           onFocus={() => getStateTitle(card.title)}
                                                           className={classes.cardDetailsTitle}
                                                           value={title || card.title}
                                                    />
                                                    <Box className={classes.cardDetailsSubTitle}
                                                         component="span"
                                                         display="block"
                                                    >
                                                        <Typography color="textSecondary">
                                                            {`from "${list.title}"`}
                                                        </Typography>
                                                    </Box>

                                                    <Typography className={classes.cardDetailsLabel}>Description:</Typography>
                                                    <Card>
                                                        <CardContent>
                                                            <Typography>
                                                                <TextareaAutosize
                                                                        onChange={(e) => getStateDescription(e.target.value)}
                                                                        onBlur={() => setStateDescription(card.id, list.id)}
                                                                        onFocus={() => getStateDescription(card.text)}
                                                                        className={classes.cardDetailsDescription}
                                                                        value={description || card.text}
                                                                        aria-label="minimum height"
                                                                        rowsMin={1}
                                                                />
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                    <CardInnerList
                                                            cardList={card.list}
                                                            listId={listId}
                                                            cardId={cardId}
                                                    />
                                                    <Comments
                                                            commentsList={card.comments}
                                                            cardId={cardId}
                                                            listId={listId}
                                                    />
                                                </CardContent>
                                            </>
                                            :
                                            <></>
                                    }
                                </Fragment>
                            ))
                        }
                    </Fragment>
                ))}
            </>
    );
};

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(TaskCardDetails);