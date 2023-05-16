/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, Box } from "@mui/material";

type TypeUploadWidget = () => JSX.Element;

declare global {
  interface Window {
    cloudinary: any;
  }
}

const UploadWidget2: TypeUploadWidget = () => {
  const str: string[] = [];

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
          str.push(result.info.secure_url);
          console.log(result.info);
          console.log("Done! Here is the image info: ", str);
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
