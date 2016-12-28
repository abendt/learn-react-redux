import React from "react";
import Footer from "./Footer";
import VisibleTodoList from "../containers/VisibleTodoList";
import AddTodo from "../containers/AddTodo";
import Notification from "../containers/Notification";
import {Grid} from "react-bootstrap";

const App = ({params}) => (
    <Grid>
        <h1>React/Redux Todo Tutorial</h1>

        <AddTodo />

        <VisibleTodoList filter={params.filter || 'all' }/>

        <Footer />

        <Notification/>
    </Grid>
);

export default App;