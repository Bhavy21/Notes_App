import { useEffect, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import debounce from 'lodash.debounce';

const EditorBox = ({ editorRef, content, setContent, config }) => {
  // Debounce inside component
  const debouncedSetContent = useCallback(
    debounce((newContent) => {
      setContent(newContent);
    }, 300),
    [setContent]
  );

  // Cleanup on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      debouncedSetContent.cancel();
    };
  }, [debouncedSetContent]);

  return (
    <JoditEditor
      ref={editorRef}
      value={content}
      config={config}
      tabIndex={1}
      onChange={debouncedSetContent}
    />
  );
};

export default EditorBox;
