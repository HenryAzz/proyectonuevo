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

const UploadWidget: TypeUploadWidget = () => {
  

  useEffect(() => {
    const cloudName = "dmwmdylpa";
    const uploadPreset = "dkmqrwwv";

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          miArray.push(result.info.secure_url);
        }
      }
    );

    (document.getElementById("upload_widget") as HTMLElement).addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }, []);

  return (
    <div>
      <Button sx={{ bgcolor: "#ffecb3", height: "30px" }} id="upload_widget">
        Adjunte imagen del título de propiedad
      </Button>
    </div>
  );
};

export default UploadWidget;
