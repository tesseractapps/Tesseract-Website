import "./AddBlogStyles.css";
import { useState, useRef } from "react";
import imageIcon from "../../assets/image-icon.svg";
import textFormat from "../../assets/text_format.svg";
import deleteIcon from "../../assets/delete_bin.svg";
const AddBlog = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("No file chosen");

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file: File | undefined = event.target.files?.[0];
    setFileName(file ? file.name : "No file chosen");
  };
  return (
    <div id="add-blog-container">
      <div id="add-blog-title">New Blog</div>
      <div className="add-blog-tags-container">
        <div className="add-blog-tags-title">Heading :</div>
        <input
          type="text"
          className="add-blog-tags-input"
          placeholder="Enter blog heading"
        />
      </div>
      <div className="add-blog-tags-container">
        <div className="add-blog-tags-title">Tags :</div>
        <input
          type="text"
          className="add-blog-tags-input"
          placeholder="Enter blog tags"
        />
      </div>
      <div className="add-blog-tags-container">
        <div className="add-blog-tags-title">Picture :</div>
        <p id="add-blog-file-name">{fileName}</p>
        <button onClick={handleButtonClick} id="add-blog-upload-button">
          Select
        </button>
        <img loading="lazy" src={imageIcon} alt="Upload" id="image-icon" />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="add-blog-tags-container-textarea">
        <div className="add-blog-tags-title">Blog Text :</div>
        <textarea
          id="add-blog-textarea"
          placeholder="Enter blog text"
          spellCheck="true"
          rows={20}
        ></textarea>
      </div>
      <div id="add-blog-action-icons">
        <img loading="lazy" src={textFormat} alt="TextFormat" className="blog-action-icon" />
        <img loading="lazy" src={deleteIcon} alt="Delete" className="blog-action-icon" />
      </div>
    </div>
  );
};

export default AddBlog;
