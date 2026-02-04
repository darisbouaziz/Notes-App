import NoteForm from "./components/NoteForm";
import { useState, useEffect } from "react";
import NoteList from "./components/NoteList";

const App = () => {
  /* 
  - localStorage.getItem(): Retrives the JSON of the item in the local storage or return null if the item dont exist in the local storage
  - JSON.parse(): convert a JSON string to a js object
  */
  const [notes, setNotes] = useState(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));

    return notes || [];
  });

  /* 
  - JSON.stringify(): convert a js object to a JSON string
  - localStorage.setItem(): When "notes" is updated the local storage add (if "notes" don't exist) or change (if "notes" already exist) his "notes" item with the new one 
  */
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const deleteNote = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id != id));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">📝 Notes App</h2>

      <NoteForm notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} deleteNote={deleteNote} />
    </div>
  );
};

export default App;
