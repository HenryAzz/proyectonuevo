import { useState } from "react";
import { Grid } from "@mui/material";
import { HomeDesktop } from "../homeDesktop/HomeDesktop";

import { FirstFilters } from "../firstFilters/FirstFilters";
import { SecondFilters } from "../secondFilters/secondFilters";
import { useTheme, useMediaQuery } from "@mui/material";

const HomeContainer = () => {
  const [stringQuery, setStringQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [operation, setOperation] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [bedroom, setBedroom] = useState<string | null>(null);

  const theme = useTheme();
  const isScreenMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isScreenMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [checkedValues, setCheckedValues] = useState<Record<string, boolean>>({});

  return (
    <Grid container sx={{ flexDirection: "row" }}>
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          p: 2,
          ...(isScreenMdDown && {
            position: "sticky",
            top: "0",
            zIndex: "999",
          }),
        }}
      >
        {isScreenMdUp ? (
          <FirstFilters
            setStringQuery={setStringQuery}
            stringQuery={stringQuery}
            setCurrentPage={setCurrentPage}
            operation={operation}
            setOperation={setOperation}
            type={type}
            setType={setType}
            bedroom={bedroom}
            setBedroom={setBedroom}
          />
        ) : (
          <SecondFilters
            setStringQuery={setStringQuery}
            stringQuery={stringQuery}
            setCurrentPage={setCurrentPage}
            operation={operation}
            setOperation={setOperation}
            type={type}
            setType={setType}
            bedroom={bedroom}
            setBedroom={setBedroom}
          />
        )}
      </Grid>
      <Grid item xs={12} md={9} sx={{}}>
        <HomeDesktop
          stringQuery={stringQuery}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
    </Grid>
  );
};

export default HomeContainer;
