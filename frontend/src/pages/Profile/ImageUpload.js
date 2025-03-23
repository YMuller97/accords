import classes from "./ImageUpload.module.css";
import { Camera } from "lucide-react";
import { useRef } from "react";

const ImageUpload = ({ picture, setPicture }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const avatar = e.target.files[0];
    if (avatar && avatar.type.startsWith("image/")) {
      setPicture(avatar); // Stocke le fichier brut pour l'uploads
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={classes["pic-container"]} onClick={handleClick}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className={classes.hidden}
      />
      {picture ? (
        <img
          src={URL.createObjectURL(picture)}
          alt="avatar"
          className={classes.pic}
        />
      ) : (
        <Camera className={classes.pic} />
      )}
    </div>
  );
};

export default ImageUpload;
