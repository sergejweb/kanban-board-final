import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, makeStyles, Typography} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';

const useStyles = makeStyles(theme => ({
    taskCardBody: {
        marginTop: theme.spacing(1),
        cursor: 'pointer'
    },
    progressWrap: {
        width: '50px',
        height: '6px',
        borderRadius: '2px',
        border: '1px solid cornflowerblue'
    },
    progressInner: {
        borderRadius: '2px',
        backgroundColor: 'cornflowerblue',
        height: '100%'
    },
    taskCardAttributes: {
        marginTop: '4px',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '10px',
        position: 'relative',
        top: '20px'
    }
}));

const TaskCard = ({id, index, card}) => {

    const classes = useStyles();

    const [progress, setProgress] = useState({});

    useEffect(() => {
        if (card.list) {
            const sum = card.list.length;
            let count = 0;
            card.list.map(item => {
                if (item.check) {
                    count++;
                }
                return []
            });
            setProgress({sum, count})
        }
    }, [card.list]);

    return (
            <>
                <Draggable draggableId={String(id)}
                           index={index}
                >
                    {provided => (
                            <div {...provided.dragHandleProps}
                                 {...provided.draggableProps}
                                 ref={provided.innerRef}
                            >
                                <Card className={classes.taskCardBody}
                                >
                                    <CardContent>
                                        <Typography>{card.title}</Typography>
                                        <Box className={classes.taskCardAttributes}>
                                            {
                                                card.list &&
                                                <Box>
                                                    <Typography color="textSecondary">
                                                        ✔{`${progress.count}/${progress.sum}`}
                                                    </Typography>
                                                </Box>
                                            }
                                            {
                                                card.comments &&
                                                        <Box>
                                                            <Typography color="textSecondary">
                                                                ✎{card.comments.length}
                                                            </Typography>
                                                        </Box>
                                            }
                                        </Box>
                                    </CardContent>
                                </Card>
                            </div>
                    )}
                </Draggable>
            </>
    );
};

export default TaskCard;
