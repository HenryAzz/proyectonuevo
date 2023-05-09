import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { HomeMovil } from "../homeMovil/HomeMovil";
import { HomeDesktop } from "../homeDesktop/HomeDesktop";
import { Navbar } from "../navbar/Navbar";
import { FirstFilters } from "../firstFilters/FirstFilters";

const HomeContainer = () => {
  const [missingFilters, setMissingFilters] = useState<boolean>(false);
  const [stringQuery, setStringQuery] = useState<string>("?");
  const theme: Theme = useTheme();
  //const isSmallScream: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScream: boolean = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {missingFilters ? (
        <Box>
          <Navbar setStringQuery={setStringQuery} stringQuery={stringQuery} />
          {/* {isMediumScream ? <HomeMovil /> : <HomeDesktop stringQuery={stringQuery} />} */}
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
