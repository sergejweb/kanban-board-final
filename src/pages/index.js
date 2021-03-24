import React from 'react';
import {Box, Container, makeStyles, Typography} from '@material-ui/core';
import '../assets/scss/index.css';
import Logo from '../assets/images/mev-logo.png';
import BoardList from '../components/BoardList';

const classes = makeStyles(theme => ({
    logo: {
        margin: theme.spacing(3, 0),
        animation: 'fadeInRotate .5s linear'
    },
    logoImage: {
        maxWidth: theme.spacing(15)
    },
    underlined: {
        padding: theme.spacing(0, 1, .5),
        borderBottom: `5px solid #e43f46`
    }
}));

const Home = () => {

    return (
            <>
                <Container maxWidth="lg">
                    <Box className={classes.logo}
                         display="inline-block"
                    >
                        <img className={classes.logoImage}
                             src={Logo}
                             alt="MEV"
                        />
                    </Box>
                </Container>;
                <Container maxWidth="md">
                    <Typography
                            className={classes.title}
                            component="h1"
                            align="center"
                            variant="h3"
                            gutterBottom
                    >
                        Kanban Board
                    </Typography>
                    <Typography
                            component="h2"
                            align="center"
                            gutterBottom
                            variant="h6"
                    >
                        <Box component="span"
                             display="inline-block"
                             className={classes.underlined}
                        >
                            Test Task for a Front-End Developer Position
                        </Box>
                    </Typography>
                </Container>;
                <Container maxWidth="lg">
                    <BoardList />
                </Container>;
            </>
    )
}


export default Home;
