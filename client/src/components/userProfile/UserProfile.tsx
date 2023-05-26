import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Grid, Typography, Button, FormControl, TextField } from "@mui/material";

import { useGetUserByEmailQuery } from "../../reduxToolkit/apiSlice";

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  hashGoogle?: string | null;
}
export const UserProfile = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { data } = useGetUserByEmailQuery(user?.email || "", { refetchOnMountOrArgChange: true });

  const [render, SetRender] = useState("profile");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const isSubmitDisabled = !isValidPassword || !isValidNewPassword;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlerActivateChangePassword = () => {
    setChangePassword(true);
  };

  const handlerCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurrentPassword(value);
    setIsValidPassword(passwordRegex.test(value));
  };
  const handlerNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewPassword(value);
    let result = value !== currentPassword && passwordRegex.test(value);
    setIsValidNewPassword(result);
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handleNewPasswordFocus = () => {
    setIsNewPasswordFocused(true);
  };

  const handlerSubmit = async () => {
    const user = auth.currentUser;
    try {
      if (user?.email) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);

        setCurrentPassword("");
        setNewPassword("");
        console.log("todo okey");
      }
    } catch (error) {
      console.log("todo mal ");
    }
    setChangePassword(false);
  };

  const handlerOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    SetRender(event.currentTarget.id);
  };

  data && console.log(data);

  return (
    <Grid container sx={{ height: "100vh", p: 2 }}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          height: "5%",
        }}
      >
        <Button variant="contained" onClick={handlerOptions} id="profile">
          Perfil
        </Button>
        <Button variant="contained" onClick={handlerOptions} id="signals">
          Señas
        </Button>
        <Button variant="contained" onClick={handlerOptions} id="operations">
          Operaciones
        </Button>
      </Grid>
      <Grid container item xs={12} sx={{ height: "90%", p: 2 }}>
        {user ? (
          <Grid container justifyContent={"center"} alignContent={"center"}>
            {render === "profile" && (
              <Grid
                container
                item
                id="profile"
                xs={6}
                sx={{
                  backgroundColor: "#ffe0b2",
                  p: 2,
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Informacion personal
                  </Typography>
                  {data && (
                    <>
                      <Grid container justifyContent="space-around" sx={{ mb: 2, p: 1 }}>
                        <Typography variant="h6">Nombre: {data.name}</Typography>
                      </Grid>

                      <Grid container justifyContent="space-around" sx={{ mb: 2, p: 1 }}>
                        <Typography variant="h6">Email: {data.email}</Typography>
                      </Grid>

                      <Grid container justifyContent="space-around" sx={{ mb: 2, p: 1 }}>
                        {changePassword ? (
                          <Grid container flexDirection="column">
                            <FormControl sx={{ mb: 1.5 }}>
                              <TextField
                                label="ingrese su contraseña actual"
                                type="password"
                                variant="outlined"
                                value={currentPassword}
                                onChange={handlerCurrentPassword}
                                onFocus={handlePasswordFocus}
                                error={!isValidPassword && isPasswordFocused}
                                helperText={
                                  !isValidPassword && isPasswordFocused
                                    ? "la contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial"
                                    : ""
                                }
                              />
                            </FormControl>
                            <FormControl sx={{ mb: 1.5 }}>
                              <TextField
                                label="ingrese su contraseña actual"
                                type="password"
                                variant="outlined"
                                value={newPassword}
                                onChange={handlerNewPassword}
                                onFocus={handleNewPasswordFocus}
                                error={!isValidPassword && isNewPasswordFocused}
                                helperText={
                                  !isValidNewPassword && isNewPasswordFocused
                                    ? "Debe ingrear una contraseña valida y la contraseña no puede ser igual a su contraseña anterior"
                                    : ""
                                }
                              />
                            </FormControl>
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={isSubmitDisabled}
                              fullWidth
                              sx={{ mb: 2 }}
                              onClick={handlerSubmit}
                            >
                              Confimar contraseña
                            </Button>
                          </Grid>
                        ) : (
                          <Button variant="contained" onClick={handlerActivateChangePassword}>
                            Cambiar contraseña
                          </Button>
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            )}

            {render === "signals" && (
              <Grid
                container
                item
                id="signals"
                sx={{
                  backgroundColor: "#ffe0b2",
                  p: 2,
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Grid
                  container
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "white",
                    p: 2,
                    justifyContent: "space-around",
                  }}
                >
                  <Typography variant="h6" sx={{ width: "100%", mb: 2, textAlign: "center" }}>
                    Propiedades señadas
                  </Typography>
                  {data &&
                    data.signals &&
                    data.signals.map((signal, index) => (
                      <Grid container key={index}>
                        <Grid item xs={2}>
                          <Typography sx={{ textAlign: "center" }}>ID de la operacion</Typography>
                          <Typography sx={{ textAlign: "center" }}>{signal.id}</Typography>
                        </Grid>
                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>operacion</Typography>
                          <Typography sx={{ textAlign: "center" }}>{signal.operation}</Typography>
                        </Grid>
                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>Precio</Typography>
                          <Typography sx={{ textAlign: "center" }}>{signal.price}</Typography>
                        </Grid>
                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>Pagado</Typography>
                          <Typography sx={{ textAlign: "center" }}>{signal.payed}</Typography>
                        </Grid>
                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>Sitaucion</Typography>
                          <Typography sx={{ textAlign: "center" }}>{signal.situation}</Typography>
                        </Grid>
                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>Id del Corredor</Typography>
                          <Typography sx={{ textAlign: "center" }}>{signal.brokerId}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            )}

            {render === "operations" && (
              <Grid
                container
                item
                id="operations"
                sx={{
                  backgroundColor: "#ffe0b2",
                  p: 2,
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
                  justifyContent: "center",
                }}
              >
                <Grid
                  container
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "white",
                    p: 2,
                    justifyContent: "space-around",
                  }}
                >
                  <Typography variant="h6" sx={{ width: "100%", mb: 2, textAlign: "center" }}>
                    Operaciones realizadas
                  </Typography>
                  {data &&
                    data.signals &&
                    data.properties.map((property, index) => (
                      <Grid container key={index}>
                        <Grid item xs={2}>
                          <Typography sx={{ textAlign: "center" }}>ID de la operacion</Typography>
                          <Typography sx={{ textAlign: "center" }}>{property.id}</Typography>
                        </Grid>
                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>operacion</Typography>
                          <Typography sx={{ textAlign: "center" }}>{property.title}</Typography>
                        </Grid>
                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>Precio</Typography>
                          <Typography sx={{ textAlign: "center" }}>
                            {property.unit_price}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>Pagado</Typography>
                          <Typography sx={{ textAlign: "center" }}>{property.payed}</Typography>
                        </Grid>

                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>flexDirection</Typography>
                          <Typography sx={{ textAlign: "center" }}>{property.address}</Typography>
                        </Grid>
                        <Grid item xs={2} key={index}>
                          <Typography sx={{ textAlign: "center" }}>DNI del titular</Typography>
                          <Typography sx={{ textAlign: "center" }}>{property.dni}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};
