import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// @mui
import { Stack, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email" />

        <TextField
          name="password"
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <VisibilityOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" sx={{ my: 3 }}>
        <Link>
          <Typography variant="subtitle2" underline="hover">
            Olvidaste tu contraseña?
          </Typography>
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Inicair Sesion
      </LoadingButton>
    </>
  );
}
