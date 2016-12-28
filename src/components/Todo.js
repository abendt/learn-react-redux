import React from "react";
import {ListItem} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import ActionAssignment from "material-ui/svg-icons/action/assignment";
import ActionAssignmentTurnedIn from "material-ui/svg-icons/action/assignment-turned-in";
import {blue500, green500} from "material-ui/styles/colors";

const Todo = ({text, completed, onClick}) => {

    const icon = completed ? <ActionAssignmentTurnedIn /> : <ActionAssignment />
    const color = completed ? green500 : blue500;

    return (
        <ListItem
            leftAvatar={<Avatar icon={icon} backgroundColor={color} />}

            onClick={() => onClick()}

            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            {text}
        </ListItem>
    );
};

export default Todo;
