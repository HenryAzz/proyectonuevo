import { useState } from "react";
import { Grid } from "@mui/material";
//import { Theme, useTheme } from "@mui/material/styles";
// import queryString from 'query-string'; //info por query
// import axios from 'axios'
//import { HomeMovil } from "../homeMovil/HomeMovil";
import { HomeDesktop } from "../homeDesktop/HomeDesktop";
//import { Navbar } from "../navbar/Navbar";
import { FirstFilters } from "../firstFilters/FirstFilters";
import { NavBarTest } from "../navbarTest/NavBarTest";
import { SecondFilters } from "../secondFilters/secondFilters";
import { useTheme, useMediaQuery } from "@mui/material";

const HomeContainer = () => {
  //validar pago por mercadopago
  // const queryParams = queryString.parse(window.location.search)
  // useEffect(() => {
  //   const fetchPayment = async () => {
  //     try {
  //       await axios.post(`http://localhost:3001/mercadopago/payment`, queryParams);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       window.location.reload();
  //     }
  //   };

  //   fetchPayment();

  // },[queryParams])

  const [stringQuery, setStringQuery] = useState<string>("?");

  const theme = useTheme();
  const isScreenMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [checkedValues, setCheckedValues] = useState<Record<string, boolean>>({});

  return (
    <>
      <Grid container sx={{ flexDirection: "row" }}>
        {/* <Navbar setStringQuery={setStringQuery} stringQuery={stringQuery} /> */}
        <Grid item xs={12}>
          <NavBarTest />
        </Grid>
        <Grid item xs={12} md={3} sx={{ p: 2, position: "sticky", top: "0", zIndex: "999" }}>
          {isScreenMdUp ? (
            <FirstFilters setStringQuery={setStringQuery} stringQuery={stringQuery} />
          ) : (
            <SecondFilters
              setStringQuery={setStringQuery}
              stringQuery={stringQuery}
              checkedValues={checkedValues}
              setCheckedValues={setCheckedValues}
            />
          )}
        </Grid>
        <Grid item xs={12} md={9} sx={{}}>
          <HomeDesktop stringQuery={stringQuery} />
        </Grid>
      </Grid>
    </>
  );
};

export default HomeContainer;
