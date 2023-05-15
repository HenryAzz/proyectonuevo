/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button } from "@mui/material";
import {miArray} from './config'


type TypeUploadWidget = () => JSX.Element;

declare global {
  interface Window {
    cloudinary: any;
  
  }
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDNAME_CLOUDINARY
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET_CLOUDINARY

const UploadWidget: TypeUploadWidget = () => {
  

  useEffect(() => {
    const cloudName = CLOUD_NAME//"dmwmdylpa";
    const uploadPreset = UPLOAD_PRESET//"dkmqrwwv";

  
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          cropping: true
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            miArray.push(result.info.secure_url);
          }
        }
      );

      (document.getElementById("upload_widget3") as HTMLElement).addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    
  }, []);

  return (
    <div>
      <Button sx={{ bgcolor: "#ffecb3", height: "30px" }} id="upload_widget3">
        Adjunte imagen del título de propiedad
      </Button>
    </div>
  );
};

export default UploadWidget;
