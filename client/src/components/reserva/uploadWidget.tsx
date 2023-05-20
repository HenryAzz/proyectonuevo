/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button } from "@mui/material";



type TypeUploadWidget = () => JSX.Element;

const arr: string[] = []

declare global {
  interface Window {
    cloudinary: any;
  
  }
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDNAME_CLOUDINARY
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET_CLOUDINARY

const UploadWidget3: TypeUploadWidget = () => {
  

  useEffect(() => {
    const cloudName = CLOUD_NAME
    const uploadPreset = UPLOAD_PRESET

  
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          cropping: true
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            arr.push(result.info.secure_url);
          }
        }
      );

      (document.getElementById("upload_widget4") as HTMLElement).addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    
  }, []);

  return (
    <div>
      <Button sx={{ bgcolor: "#ffecb3", height: "30px" }} id="upload_widget4">
        Adjuntar imagen comprobante ingreso
      </Button>
    </div>
  );
};

export default UploadWidget3;
