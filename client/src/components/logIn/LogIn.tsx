import { Grid } from "@mui/material";
import logo from "../../image/logo.png";
import LockIcon from "@mui/icons-material/Lock";
import s from "./LogIn.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";

export const LogIn = () => {
  return (
    <Grid container>
      <div className={s.conteiner}>
        <img className={s.logo} src={logo} alt="logo" width="250px" height="50px" />
        <div className={s.conteinerForm}>
          <div className={s.contac_form}>
            <div className={s.formulario}>
              <form>
                <AccountCircleIcon fontSize="large" sx={{ margin: 6, ml: 3, mt: 8 }} />
                <TextField
                  id="input-with-sx"
                  label="User Name"
                  variant="standard"
                  sx={{ mt: 5, mr: 8 }}
                />
                <LockIcon fontSize="large" sx={{ margin: 6, ml: 3, mt: 8 }} />
                <TextField
                  id="input-with-sx"
                  label="Password"
                  variant="standard"
                  sx={{ mt: 5, mr: 8 }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};
