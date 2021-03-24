import initialState from '../state/initialState';
import {CONSTANTS} from '../actions';

let lastId = 10;

const listReducer = (state = initialState, action) => {
    switch (action.type) {

        case CONSTANTS.ADD_NEW_BOARD: {
            const newState = {...state};
            const newBoard = {
                boardName: action.payload,
                id: `board-${++lastId}`,
                boardLists: []
            };
            newState.boards.push(newBoard);
            return newState;
        }

        case CONSTANTS.SET_CURRENT_BOARD: {
            const newState = {...state};
            newState.currentBoard = action.payload;
            return newState;
        }

        case CONSTANTS.ADD_LIST: {
            const newState = {...state};
            const newList = {
                title: action.payload,
                id: `list-${++lastId}`,
                cards: [],
            };
            const lists = newState.boards[newState.currentBoard].boardLists;
            newState.boards[newState.currentBoard].boardLists = [...lists, newList];
            return newState;
        }

        case CONSTANTS.ADD_CARD: {
            const newState = {...state};
            const {listId, title} = action.payload;
            const newCard = {
                title,
                id: `card-${++lastId}`,
                text: '',
            };
            newState.boards[newState.currentBoard].boardLists.map(list => {
                if (list.id === listId) {
                    list.cards = [...list.cards, newCard]
                    return list;
                } else {
                    return list;
                }
            });

            return newState;
        }

        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                type
            } = action.payload;
            const newState = {...state};

            if (type === 'list') {
                const list = newState.boards[newState.currentBoard].boardLists.splice(droppableIndexStart, 1);
                newState.boards[newState.currentBoard].boardLists.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            if (droppableIdStart === droppableIdEnd) {
                const list = state.boards[newState.currentBoard].boardLists.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            } else {
                const listStart = state.boards[newState.currentBoard].boardLists.find(list => droppableIdStart === list.id);
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state.boards[newState.currentBoard].boardLists.find(list => droppableIdEnd === list.id);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState

        case CONSTANTS.EDIT_CARD_DESCRIPTION:
        {
            const {id, listId, text} = action.payload;

            const newState = {...state};

            const index = {};

            state.boards[newState.currentBoard].boardLists.map((list, i) => {
                if (list.id === listId) {
                    index.list = i;
                    list.cards.map((card, ii) => {
                        if (card.id === id) {
                            index.card = ii;
                        }
                        return [];
                    });
                }
                return [];
            });

            newState.boards[newState.currentBoard].boardLists[index.list].cards[index.card].text = text;

            return newState;
        }

        case CONSTANTS.EDIT_CARD_TITLE:
        {
            const {id, listId, title} = action.payload;

            const newState = {...state};

            const index = {};

            state.boards[newState.currentBoard].boardLists.map((list, i) => {
                if (list.id === listId) {
                    index.list = i;
                    list.cards.map((card, ii) => {
                        if (card.id === id) {
                            index.card = ii;
                        }
                        return [];
                    })
                }
                return [];
            });

            newState.boards[newState.currentBoard].boardLists[index.list].cards[index.card].title = title;

            return newState;
        }

        case CONSTANTS.ADD_CARD_LIST_ITEM: {
            const {cardId, listId, text} = action.payload;
            const newItem = {
                text,
                id: `item-${++lastId}`,
                check: false
            }

            const newState = {...state};

            newState.boards[newState.currentBoard].boardLists.map(list => {
                if (list.id === listId) {
                    list.cards.map(card => {
                        if (card.id === cardId) {
                            if (card.list) {
                                card.list = [...card.list, newItem];
                            } else {
                                card.list = [newItem];
                            }
                            return card;
                        } else {
                            return card;
                        }
                    });
                    return list;
                } else {
                    return list;
                }
            });
            return newState;
        }

        case CONSTANTS.SET_ITEM_AS_CHECKED: {
            const {cardId, listId, itemId} = action.payload;
            const newState = {...state};

            newState.boards[newState.currentBoard].boardLists.map(list => {
                if (list.id === listId) {
                    list.cards.map(card => {
                        if (card.id === cardId) {
                            card.list.map(item => {
                                if (item.id === itemId) {
                                    item.check = !item.check;
                                }
                              return item;
                            })
                            return card;
                        } else {
                            return card;
                        }
                    });
                    return list;
                } else {
                    return list;
                }
            });

            return newState;
        }

        case CONSTANTS.ADD_COMMENT: {
            const {cardId, listId, text} = action.payload;

            const newState = {...state};

            newState.boards[newState.currentBoard].boardLists.map(list => {
                if (list.id === listId) {
                    list.cards.map(card => {
                        if (card.id === cardId) {
                            if (card.comments) {
                                card.comments = [...card.comments, text];
                            } else {
                                card.comments = [text];
                            }
                            return card;
                        } else {
                            return card;
                        }
                    });
                    return list;
                } else {
                    return list;
                }
            });
            return newState;
        }

        default: {
            return state;
        }
    }
}

export default listReducer;