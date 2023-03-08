import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./index.css";
import Main from "./Main";
import Sidebar from "./Sidebar";
function App() {

  const [true_var,setCollapse] = useState(false)

  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);

  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const toggle_sidebar = () =>{
    (true_var?setCollapse(false):setCollapse(true))
  

  }

  const onUpdateNote = (updatedNote) => {
    const updateArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });
    setNotes(updateArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };



  return (
    <div className="App">
    <button className = "toggle_button" onClick={toggle_sidebar}>&#9776;</button>
      <div className="header">
        <div>
          <h1>Lotion</h1>
          <p>Like Notion. but Worse</p>
        </div>
      </div>
      
      <div className="below_header">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        toggle_sidebar = {true_var}
      />

      <Main 
      activeNote={getActiveNote()} 
      onUpdateNote={onUpdateNote} 
      onDeleteNote = {onDeleteNote}
      />
    </div>
    </div>
  );



}
export default App;
