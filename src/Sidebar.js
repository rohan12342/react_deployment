import { useState } from "react";


const Sidebar = ({
    notes,
    onAddNote,
    activeNote,
    setActiveNote,
    toggle_sidebar
  }) => { const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);


    const extractTextContent = (html) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(html, "text/html");
        return parsed.documentElement.textContent;

    };

    return (
        <div className={`app-sidebar ${toggle_sidebar ? "hide" : ""}`}>
          <div className="app-sidebar-header">
            <h1>Notes</h1>
            <button onClick={onAddNote}>&#43;</button>
          </div>
          <div className="app-sidebar-notes">
            {sortedNotes.map(({ id, title, body, lastModified }, i) => (
              <div
                className={`app-sidebar-note ${id === activeNote && "active"}`}
                onClick={() => setActiveNote(id)}
              >
                <div className="sidebar-note-title">
                  <strong>{title}</strong>
                </div>
    
                <p>{body && extractTextContent(body.substr(0, 100)) + "..."}</p>
                <small className="note-meta">
                  Last Modified{":  "}
                  {new Date(lastModified).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default Sidebar;