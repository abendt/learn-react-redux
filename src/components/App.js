import React from "react";
import Footer from "./Footer";
import VisibleTodoList from "../containers/VisibleTodoList";
import AddTodo from "../containers/AddTodo";
import Notification from "../containers/Notification";
import UndoRedo from "../containers/UndoRedo";
import {Grid, Panel} from "react-bootstrap";

const App = ({params}) => (
    <Grid>
        <Panel header={<h3>Todo App</h3>}>
            <AddTodo />

            <VisibleTodoList />

            <Footer />

            <UndoRedo />

            <Notification/>
        </Panel>
    </Grid>
);

export default App;