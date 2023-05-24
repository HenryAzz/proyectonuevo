// @mui
import { styled } from "@mui/material/styles";
import { ListItemIcon, ListItemButton } from "@mui/material";

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: "10vh",
    position: "relative",
    textTransform: "capitalize",
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
  })
);

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 25,
  height: 30,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
