import { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const onChangeContent = useCallback((event, editor) => {
  const data = editor.getData();
  setContent({ data });
  // console.log({ event, editor, data });
}, []);

class Editor extends Component {
  render() {
    return (
      <CKEditor
        data="<p>Hello from CKEditor 5!!</p>"
        onInit={editor => console.log("Editor is ready to use!", editor)}
        onChange={(event, editor) => {
          console.log("Change", { event, editor });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", { event, editor });
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", { event, editor });
        }}
        editor={ClassicEditor}
      />
    );
  }
}

export default Editor;
