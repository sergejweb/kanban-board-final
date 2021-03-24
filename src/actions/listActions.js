import {CONSTANTS} from './index';

export const setCurrentBoard = (index) => {
    return {
        type: CONSTANTS.SET_CURRENT_BOARD,
        payload: index,
    };
};

export const addNewBoard = title => {
    return {
        type: CONSTANTS.ADD_NEW_BOARD,
        payload: title,
    };
};

export const addList = (title) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title,
    };
};

export const sort = (
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        droppableId,
        type,
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            droppableId,
            type,
        },
    };
};