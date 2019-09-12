import React from "react";
import {Switch, Route} from "react-router-dom";

import SidebarContainer from "./sidebar_container.js";
import NotebookIndexContainer from "./notebook_index_container.js";
import NotebookShowContainer from "./notebook_show_container.js";


const Note = (props) => (
  <div className="note">
    <SidebarContainer />
      
    <Route path={"/note/notebooks/:id"} component={NotebookShowContainer} />
    <Route exact path={"/note/notebooks"} component={NotebookIndexContainer} />

  </div>
)

export default Note;
