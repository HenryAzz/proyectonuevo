import { useState, useEffect } from "react";
import { Box } from "@mui/material";
//import { Theme, useTheme } from "@mui/material/styles";
// import queryString from 'query-string'; //info por query
// import axios from 'axios'
//import { HomeMovil } from "../homeMovil/HomeMovil";
import { HomeDesktop } from "../homeDesktop/HomeDesktop";
import { Navbar } from "../navbar/Navbar";
import { FirstFilters } from "../firstFilters/FirstFilters";

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
