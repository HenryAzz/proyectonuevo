import { useState } from "react";
import { Box } from "@mui/material";
import { HomeDesktop } from "../homeDesktop/HomeDesktop";
import { Navbar } from "../navbar/Navbar";
import { FirstFilters } from "../firstFilters/FirstFilters";

const HomeContainer = () => {
  const [missingFilters, setMissingFilters] = useState<boolean>(false);
  const [stringQuery, setStringQuery] = useState<string>("?");

  return (
    <>
      {missingFilters ? (
        <Box>
          <Navbar setStringQuery={setStringQuery} stringQuery={stringQuery} />
          <HomeDesktop stringQuery={stringQuery} />
        </Box>
      ) : (
        <FirstFilters
          setMissingFilters={setMissingFilters}
          setStringQuery={setStringQuery}
          stringQuery={stringQuery}
        />
      )}
    </>
  );
};

export default HomeContainer;
