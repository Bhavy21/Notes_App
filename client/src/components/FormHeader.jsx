const FormHeader = ({ form, handleChange }) => (
  <div className="title-category-container">
    <input
      name="title"
      value={form.title}
      onChange={handleChange}
      placeholder="Title"
      required
      className="note-title"
    />
    <select
      name="category"
      value={form.category}
      onChange={handleChange}
      required
      className="category-select"
    >
      <option value="">Select Category</option>
      <option value="Personal">Personal</option>
      <option value="Study">Study</option>
      <option value="Work">Work</option>
      <option value="Others">Others</option>
    </select>
  </div>
);

export default FormHeader;
