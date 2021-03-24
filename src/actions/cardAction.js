import {CONSTANTS} from './index';

export const addCard = (listId, title) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {listId, title}
    };
};

export const editCardTitle = (id, listId, title) => {
    return {
        type: CONSTANTS.EDIT_CARD_TITLE,
        payload: {
            id,
            listId,
            title
        }
    };
};

export const editCardDescription = (id, listId, text) => {
    return {
        type: CONSTANTS.EDIT_CARD_DESCRIPTION,
        payload: {
            id,
            listId,
            text
        }
    };
};

export const addCardListItem = (cardId, listId, text) => {
    return {
        type: CONSTANTS.ADD_CARD_LIST_ITEM,
        payload: {
            cardId,
            listId,
            text
        }
    };
};

export const setItemAsChecked = (cardId, listId, itemId) => {
    return {
        type: CONSTANTS.SET_ITEM_AS_CHECKED,
        payload: {cardId, listId, itemId}
    };
};

export const addComment = (cardId, listId, text) => {
    return {
        type: CONSTANTS.ADD_COMMENT,
        payload: {cardId, listId, text}
    };
};