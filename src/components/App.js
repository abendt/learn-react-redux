import React from "react";
import Footer from "./Footer";
import VisibleTodoList from "../containers/VisibleTodoList";
import AddTodo from "../containers/AddTodo";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SnackbarNotification from "../containers/SnackbarNotification";

const styles = {
    container: {},
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});


const App = ({store}) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
            <h1>React/Redux Todo Tutorial</h1>

            <AddTodo />

            <VisibleTodoList />

            <Footer />

            <SnackbarNotification/>
        </div>
    </MuiThemeProvider>
);

export default App;