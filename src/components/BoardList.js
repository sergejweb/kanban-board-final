import React from 'react';
import {Card, Grid, makeStyles, Typography} from '@material-ui/core';
import {Link} from 'gatsby';
import {connect} from 'react-redux';
import {setCurrentBoard} from '../actions';
import BoardAddon from './BoardAddon';

const useStyle = makeStyles(theme => ({
    boardList: {
        marginTop: theme.spacing(4),
        '& a': {
            textDecoration: 'none'
        }
    },
    boardListItem: {
        padding: theme.spacing(1),
        height: theme.spacing(10),
        transition: 'transform .2s',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    }
}));

const BoardList = ({lists, dispatch}) => {

    const classes = useStyle();

    const setCurrentBoardHandle = (index) => {
        dispatch(setCurrentBoard(index))
    }

    return (
        <Grid className={classes.boardList} container spacing={4}>
            {lists.boards.map((tile, index) => (
                    <Grid onMouseDown={() => setCurrentBoardHandle(index)}
                          key={tile.id} item lg={2} md={3} xs={6}
                    >
                        <Link to={`/board/`}>
                            <Card className={classes.boardListItem}>
                                <Typography>
                                    {tile.boardName}
                                </Typography>
                            </Card>
                        </Link>
                    </Grid>
            ))}
            <Grid item lg={2} md={3} xs={6}>
                <BoardAddon/>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(BoardList);
