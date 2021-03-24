import React, {useState} from 'react';
import {Box, Card, CardContent, CardHeader, makeStyles} from '@material-ui/core';
import TaskCard from './TaskCard';
import {connect} from 'react-redux';
import InputButton from './InputButton';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import PopupContainer from './PopupContainer';
import TaskCardDetails from './TaskCardDetails';

const useStyles = makeStyles(theme => ({
    taskListBody: {
        width: theme.spacing(40),
        textTransform: 'capitalize',
        background: '#ebecf0',
        overflow: 'visible',
        outline: 'none'
    },
    taskListWrapper: {
        gap: theme.spacing(3),
        alignItems: 'self-start'
    },
    withButton: {
        fontSize: theme.spacing(6),
        background: 'rgba(0,0,0,.3)'
    },
}));

const TaskList = ({lists}) => {

    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(false);
    const [cardListId, setCardListId] = useState(null);

    const openDetailsHandler = (cardId, listId) => {
        setIsOpen(true);
        setCardListId({cardId, listId});
    };

    const popupCloseHandler = () => {
        setIsOpen(false);
    }

    return (
            <Box className={classes.taskListWrapper}
                 display="flex"
            >
                {
                    lists.boards[lists.currentBoard].boardLists.map((list, index) => (
                        <Draggable draggableId={String(list.id)}
                                   key={list.id}
                                   index={index}
                        >
                            {provided => (
                                <div {...provided.draggableProps}
                                     ref={provided.innerRef}
                                     {...provided.dragHandleProps}
                                >
                                    <Droppable droppableId={String(list.id)}
                                               type="card"
                                    >
                                        {(provided) => (
                                            <div {...provided.dropableProps}
                                                 ref={provided.innerRef}
                                            >
                                                <Card className={classes.taskListBody}
                                                      key={list.id}
                                                      index={index}
                                                >
                                                    <CardHeader title={list.title}/>
                                                    <CardContent>
                                                        {
                                                            list.cards.map((card, index) => (
                                                                <div onClick={() => openDetailsHandler(card.id, list.id)}
                                                                     key={card.id}
                                                                >
                                                                    <TaskCard
                                                                            index={index}
                                                                            id={card.id}
                                                                            card={card}
                                                                    />
                                                                </div>
                                                            ))
                                                        }
                                                    </CardContent>
                                                    {provided.placeholder}
                                                    <InputButton listId={list.id}
                                                                 addAsCard
                                                    />
                                                </Card>
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            )}
                        </Draggable>
                    ))
                }
                <Card className={`${classes.taskListBody} ${classes.withButton}`}>
                    <InputButton/>
                </Card>
                {
                    isOpen
                            ?
                            <PopupContainer closeHandler={popupCloseHandler}>
                                <TaskCardDetails
                                        cardId={cardListId.cardId}
                                        listId={cardListId.listId}
                                />
                            </PopupContainer>
                            :
                            <></>
                }
            </Box>
    );
};

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(TaskList);
