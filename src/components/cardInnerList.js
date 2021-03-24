import React, {useEffect, useState} from 'react';
import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {addCardListItem, setItemAsChecked} from '../actions';

const useStyles = makeStyles(theme => ({
    list: {
        listStyleType: 'none',
        padding: 0
    },
    listItem: {
        position: 'relative',
        paddingLeft: '23px',
        cursor: 'pointer',
        marginBottom: '2px',
        width: 'auto',
        '&:before': {
            content: '""',
            position: 'absolute',
            border: '1px solid rgba(0, 0, 0, 0.54)',
            width: '14px',
            height: '14px',
            top: '3px',
            left: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            lineHeight: 1,
            fontSize: '25px',
            color: 'cornflowerblue'
        }
    },
    listItemDone: {
        textDecoration: 'line-through',
        textDecorationColor: 'cornflowerblue',
        '&:before': {
            content: '"\\2714"',
            borderColor: 'transparent'
        }
    },
    btnCreate: {
        marginTop: theme.spacing(1)
    },
    inputWrapper: {
        marginTop: theme.spacing(1)
    },
    editorField: {
        marginRight: theme.spacing(1),
        marginTop: '2px',
        fontSize: '14px',
        border: 'none',
        padding: '10px 4px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        borderRadius: '1px',
        '&:focus': {
            outline: 'none'
        }
    },
    smallerBtn: {
        minWidth: theme.spacing(5)
    },
    progressWrap: {
        width: 'calc(100% - 10px)',
        height: theme.spacing(1),
        borderRadius: '2px',
        margin: 'auto',
        marginTop: theme.spacing(3),
        border: '1px solid cornflowerblue'
    },
    progressInner: {
        borderRadius: '2px',
        backgroundColor: 'cornflowerblue',
        height: '100%'
    }
}));

const CardInnerList = ({cardList, cardId, listId, dispatch}) => {

    const classes = useStyles();

    const [openEditor, setOpenEditor] = useState(false);
    const [itemText, setItemText] = useState('');
    const [progress, setProgress] = useState(0);
    const [trigger, ternTrigger] = useState(false);

    useEffect(() => {
        if (cardList) {
            const sum = cardList.length;
            let count = 0;
            cardList.map(item => {
                if (item.check) {
                    count++;
                }
                return [];
            });
            setProgress((100 / sum) * count);
        }
    }, [trigger]);

    const addListItem = (text) => {
        if (text) {
            dispatch(addCardListItem(cardId, listId, text));
            setItemText('');
            setOpenEditor(false);
        }
    };

    const clearListItem = () => {
        setItemText('');
        setOpenEditor(false);
    };

    const checkItem = (id) => {
        dispatch(setItemAsChecked(cardId, listId, id));
        ternTrigger(!trigger);
    };

    return (
            <>
                {
                    cardList
                            ?
                            <>
                                <div className={classes.progressWrap}>
                                    <div style={{width: `${progress}%`}} className={classes.progressInner}/>
                                </div>
                                <ul className={classes.list}>
                                    {
                                        cardList.map(item => (
                                                <li className={`${item.check ? classes.listItemDone : ''} ${classes.listItem}`}
                                                    onClick={() => checkItem(item.id)} key={item.id}
                                                >
                                                    <Typography>
                                                        {item.text}
                                                    </Typography>
                                                </li>
                                        ))
                                    }
                                </ul>
                            </>
                            :
                            <>
                            </>
                }
                {
                    openEditor
                            ?
                            <Box className={classes.inputWrapper}>
                                <input onChange={(e) => setItemText(e.target.value)}
                                       className={classes.editorField}
                                       value={itemText}
                                       autoFocus
                                />
                                <Button onClick={() => addListItem(itemText)}
                                        variant="contained"
                                >
                                    Add
                                </Button>
                                <Button className={classes.smallerBtn}
                                        onClick={clearListItem}
                                        variant="contained"
                                >
                                    &times;
                                </Button>
                            </Box>
                            :
                            <Button onClick={() => setOpenEditor(true)}
                                    className={classes.btnCreate}
                                    variant="contained"
                            >
                                {cardList ? 'Add Item' : 'Create List'}
                            </Button>
                }
            </>
    );
};

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(CardInnerList);