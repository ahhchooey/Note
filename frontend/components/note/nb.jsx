import React from "react";
import {Switch, Route} from "react-router-dom";

import SidebarContainer from "./sidebar_container.js";
import NotebookIndexContainer from "./notebook_index_container.js";
import NotebookShowContainer from "./notebook_show_container.js";
import NoteShowContainer from "./note_show_container.js";
import AllNotesContainer from "./all_notes_container.jsx";


const Note = (props) => (
  <div className="note">

    <Route path={"/"} component={SidebarContainer} />
      
    <Route path={"/note/notes"} component={AllNotesContainer} />
    <Route path={"/note/notes/:id"} component={NoteShowContainer} />
    <Route path={"/note/notebooks/:id"} component={NotebookShowContainer} />
    <Route path={"/note/notebooks/:notebook_id/notes/:id"} component={NoteShowContainer} />
    <Route exact path={"/note/notebooks"} component={NotebookIndexContainer} />

  </div>
)

export default Note;