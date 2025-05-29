const NoteCard = ({ note, handleEdit, handleDelete }) => (
  <div className={`note-card category-${note.category}`}>
    <h3 className="note-title">{note.title}</h3>
    <p className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />
    <div className="note-footer">
      <span className={`note-category category-${note.category}`}>{note.category}</span>
      <small>{new Date(note.createdAt).toLocaleString()}</small>
    </div>
    <div className="note-actions">
      <button onClick={() => handleEdit(note)}>✏️</button>
      <button onClick={() => handleDelete(note._id)}>🗑️</button>
    </div>
  </div>
);

export default NoteCard;
