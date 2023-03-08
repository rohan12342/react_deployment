import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Main = ({ activeNote, onUpdateNote, onDeleteNote}) => {

    const onEditField = (field, value) => {
      onUpdateNote({...activeNote, [field]: value, lastModified: Date.now()});
    };
    const [editMode, seteditMode] = useState(true);

    const SaveClick = () => {
        seteditMode(false);
    }
    const Calenderchange = (date) =>{
        const updatedNote = {
            ...activeNote, lastModified: date.getTime(),
        };
        onUpdateNote(updatedNote);
    }


    const EditClick = () => {
        seteditMode(true);
    }

    if (!activeNote) return <div className="no-active-note">No Active Note</div>;

    const DeleteClick = () => {
        if(window.confirm("do you want to delete this note?")){
            onDeleteNote(activeNote.id);
        }
    };

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };
    return (
        <div className="app-main">
        <div className="note-meta">
        </div>
        
        <div className="app-main-note-edit">
        <span>
            <input type="text" id="title" placeholder="Name your File" value={activeNote.title} onChange={(e) => onEditField("title", e.target.value)} />
            <span id = "add_space_bottom">
            {editMode ? 
                <button className="button" onClick={SaveClick}>Save</button>
            :
                <button className="button" onClick={EditClick}>Edit</button>
            }
            <button className="button" onClick={DeleteClick}>Delete</button>
            </span>
            </span>
            

            {editMode ? (
            <div className="typer">
                 <input type="datetime-local" id = "date_selector" value={formatDate(activeNote.lastModified)} onChange = {(e) => Calenderchange(new Date(e.target.value))}/>
                <ReactQuill id = "edit" value = {activeNote.body} onChange = {(value)=>onEditField('body',value)}/>
            </div>
        ):(
            <div className="app-main-note-display">
                <div className="editor" dangerouslySetInnerHTML={{__html:activeNote.body}}></div>
            </div>
        )}

        </div>
        </div>
    );
    };
    
    export default Main;