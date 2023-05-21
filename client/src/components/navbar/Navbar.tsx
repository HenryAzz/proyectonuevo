import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Button,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { auth } from "../../firebase/firebase";
import logo from "../../image/logo.png";
import { signOut } from "firebase/auth";
import { orange } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export const NavBar = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const theme = useTheme();

  const isScreenMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isScreenSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  let imgWidth = "50%"; // Valor por defecto para tamaños grandes

  if (isScreenMdDown) {
    imgWidth = "70%"; // Si la pantalla es menor o igual a "md"
  }

  if (isScreenSmDown) {
    imgWidth = "80%"; // Si la pantalla es menor o igual a "sm"
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        if (user.photoURL) {
          setUserInitial(null);
        } else {
          const initials = user.email ? user.email.charAt(0).toUpperCase() : "";
          setUserInitial(initials);
        }
      } else {
        setUser(null);
        setUserInitial(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handlerLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuCloseOutside = () => {
    if (menuAnchorEl) {
      setMenuAnchorEl(null);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        justifyContent: "space-around",
        height: "15vh",
        backgroundColor: "#ffe0b2",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
      onClick={handleMenuCloseOutside}
    >
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Link to="/home" style={{ textDecoration: "none", alignSelf: "center" }}>
            <img src={logo} alt="Logo" style={{ width: imgWidth }} />
          </Link>
        </Grid>
        <Grid item xs={5} sx={{ display: "flex", justifyContent: "center", alignSelf: "center" }}>
          {user ? (
            <IconButton aria-haspopup="true" onClick={handleMenuOpen}>
              <Avatar
                alt="porfile photo"
                src={user.photoURL || undefined}
                sx={{ bgcolor: orange[500] }}
              >
                {user.photoURL ? "" : userInitial}
              </Avatar>
              <ExpandMoreIcon sx={{ mt: 2.5 }} />
              <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                <MenuItem>
                  <Link to="/#" style={{ textDecoration: "none" }}>
                    <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                      perfil
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/#" style={{ textDecoration: "none" }}>
                    <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                      Cambiar contraseña
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Button variant="contained" onClick={handlerLogOut}>
                    Cerrar Sesión
                  </Button>
                </MenuItem>
              </Menu>
            </IconButton>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                Iniciar sesion
              </Typography>
            </Link>
          )}
        </Grid>
      </Grid>

      <Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/form" style={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            Operaciones
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/review" style={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            Testimonio
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            Nosotros
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};
