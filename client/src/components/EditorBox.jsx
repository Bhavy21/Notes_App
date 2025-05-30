import JoditEditor from 'jodit-react';

const EditorBox = ({ editorRef, config }) => {
  return (
    <JoditEditor
      ref={editorRef}
      config={config}
      defaultValue=""
      tabIndex={1}
    />
  );
};

export default EditorBox;
