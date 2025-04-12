import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "67f37449081436580e826078",
            "user": "67cd446044cb116921a23be5",
            "title": "Sleep",
            "description": "Pls sleep early",
            "tag": "Personal",
            "date": "2025-04-07T06:44:25.370Z",
            "__v": 0
        },
        {
            "_id": "67f92df96402e807b737cb46",
            "user": "67cd446044cb116921a23be5",
            "title": "play",
            "description": "go to play at 6pm",
            "tag": "Personal",
            "date": "2025-04-11T14:58:01.545Z",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(notesInitial)

    //Add a note
    const addNote = (title, description, tag) => {
        const note = {
            "_id": "67f92df96402e807b737cb46",
            "user": "67cd446044cb116921a23be5",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-04-11T14:58:01.545Z",
            "__v": 0
        }
        setnotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = () => {

    }

    //Edit a note
    const editNote = () => {

    }

    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;