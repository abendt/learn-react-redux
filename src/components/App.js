import React from "react";
import Footer from "./Footer";
import VisibleTodoList from "../containers/VisibleTodoList";
import AddTodo from "../containers/AddTodo";
import Notification from "../containers/Notification";
import UndoRedo from "../containers/UndoRedo";
import {Grid, PageHeader} from "react-bootstrap";


const App = ({params}) => (
    <Grid>
        <PageHeader>Todo App</PageHeader>

        <AddTodo />

        <VisibleTodoList />

        <Footer />

        <UndoRedo />

        <Notification/>

    </Grid>
);

export default App;