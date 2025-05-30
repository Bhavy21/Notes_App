import { useEffect, useRef, useState } from "react";
import axios from "../utils/axiosInstance";
import "./NotesPage.css";
import Header from "../components/Header";
import FormHeader from "../components/FormHeader";
import EditorBox from "../components/EditorBox";
import ActionButton from "../components/ActionButton";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", category: "" });
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [content, setContent] = useState("");
  const editor = useRef(null);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes");
      setNotes(res.data);
      localStorage.setItem("notesBackup", JSON.stringify(res.data));
    } catch (err) {
      console.warn("Fetching notes failed. Using offline data.");
      const offlineNotes = localStorage.getItem("notesBackup");
      if (offlineNotes) {
        setNotes(JSON.parse(offlineNotes));
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteData = { ...form, content };
      if (editingId) {
        await axios.put(`http://localhost:5000/notes/${editingId}`, noteData);
      } else {
        await axios.post("http://localhost:5000/notes", noteData);
      }
      setForm({ title: "", category: "" });
      setContent("");
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, category: note.category });
    setContent(note.content);
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      if (editingId === id) {
        setForm({ title: "", category: "" });
        setContent("");
        setEditingId(null);
      }
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const editorConfig = {
    readonly: false,
    toolbarButtonSize: "small",
    toolbarAdaptive: false,
    toolbarSticky: false,
    toolbar: ["bold", "italic", "underline", "|", "ul", "ol"],
    buttons: ["bold", "italic", "underline", "ul", "ol"],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showStatusbar: false,
    removeButtons: "",
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    toolbarInline: false,
    enter: "div",
    cleanHTML: {
      removeEmptyElements: true,
    },
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Header darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />

      <form className="note-form" onSubmit={handleSubmit}>
        <FormHeader form={form} handleChange={handleChange} />
        <EditorBox
          editorRef={editor}
          content={content}
          setContent={setContent}
          config={editorConfig}
        />
        <ActionButton editingId={editingId} />
      </form>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="notes-list">
        {notes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              note.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}

export default NotesPage;
