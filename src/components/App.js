import React from 'react'

import {Container, Row, Col} from 'reactstrap';
import Footer from './Footer';
import VisibleTodoList from '../containers/VisibleTodoList';
import AddTodo from '../containers/AddTodo';

const App = () => (
    <Container>
        <Row>
            <Col>
                <h1>React/Redux Todo Tutorial</h1>
            </Col>
        </Row>

        <Row>
            <Col>
                <AddTodo />
            </Col>
        </Row>

        <br />

        <Row>
            <Col>
                <VisibleTodoList />
            </Col>
        </Row>

        <Row>
            <Col>
                <Footer />
            </Col>
        </Row>
    </Container>
);

export default App;