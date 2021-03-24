import React from 'react';
import {AppBar, Box, makeStyles, Typography} from '@material-ui/core';
import {Link} from 'gatsby';
import {connect} from 'react-redux';
import TaskList from '../components/TaskList';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import { sort } from '../actions';

const useStyles = makeStyles(theme => ({
    headerSpace: {
        padding: theme.spacing(2, 0),
    },
    headerLink: {
        color: '#fff',
        textDecoration: 'none',
        display: 'inline-block',
        position: 'relative',
        padding: theme.spacing(0, 3)
    },
    mainContent: {
        margin: theme.spacing(5, 0),
        padding: theme.spacing(0, 3)
    }

}));

const Board = ({lists, dispatch}) => {

    const classes = useStyles();

    const onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;

        if (!destination) {
            return;
        }

        dispatch(sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
        ));

    };

    return (
            <>
                <AppBar position="sticky" className={classes.headerSpace}>
                    <Link to={'/'} className={classes.headerLink}>
                        <Typography component="h1" variant="h5">
                            &#x2190; {lists.boards[lists.currentBoard].boardName}
                        </Typography>
                    </Link>
                </AppBar>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="board" direction="horizontal" type="list">
                        {provided => (
                            <Box className={classes.mainContent}
                                 {...provided.droppableProps}
                                 ref={provided.innerRef}
                            >
                                <TaskList/>
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </>
    );
};
const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(Board);