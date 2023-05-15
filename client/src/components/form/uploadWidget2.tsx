/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, Box } from "@mui/material";
import {miArray} from './config'

type TypeUploadWidget = () => JSX.Element;

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDNAME_CLOUDINARY
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET_CLOUDINARY

const UploadWidget2: TypeUploadWidget = () => {
  

  useEffect(() => {
    const cloudName = CLOUD_NAME 
    const uploadPreset = UPLOAD_PRESET 

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

    (document.getElementById("upload_widget2") as HTMLElement).addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", gap: 35 }}>
        <Button sx={{ bgcolor: "#ffecb3", height: "30px" }} id="upload_widget">
          Adjunte imagen del frente del DNI
        </Button>

        <Button sx={{ bgcolor: "#ffecb3", height: "30px" }} id="upload_widget2">
          Adjunte imagen del dorso del DNI
        </Button>
      </Box>
    </div>
  );
};

export default UploadWidget2;
