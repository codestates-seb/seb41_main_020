import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  ["image"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};

const Editor = ({ placeholder, value, setValue }) => {
  return (
    <ReactQuill
      placeholder={placeholder}
      value={value}
      theme="snow"
      modules={modules}
      formats={formats}
      style={{ width: "100%", height: "40vh", backgroundColor: "white" }}
      onChange={(e) => setValue(e)}
    />
  );
};

export default Editor;
