import JoditEditor from 'jodit-react';

const EditorBox = ({ editorRef, content, setContent, config }) => (
  <JoditEditor
    ref={editorRef}
    value={content}
    config={config}
    tabIndex={1}
    onBlur={(newContent) => setContent(newContent)}
  />
);

export default EditorBox;