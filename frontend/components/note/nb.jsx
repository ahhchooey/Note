import React from "react";
import {Switch, Route} from "react-router-dom";

import SidebarContainer from "./sidebar_container.js";
import NotebookIndexContainer from "./notebook_index_container.js";


const Note = (props) => (
  <div className="note">
    <SidebarContainer />
    <Switch>
      
      <Route path={"/note/notebooks"} component={NotebookIndexContainer} />

    </Switch>
  </div>
)

export default Note;
