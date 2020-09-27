import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Fragment>
            <Container style={{ marginTop: '7em' }}>
                <h1>Home page</h1>
                <h3>Go to <Link to='/operations'>Events</Link></h3>
            </Container>
        </Fragment>
    );
};

export default HomePage;
