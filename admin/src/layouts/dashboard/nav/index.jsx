import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import ReviewsIcon from "@mui/icons-material/Reviews";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//Images
import Logo from "../../../images/logo.png";
import logoIcon from "../../../images/iconLogo.png";
// ----------------------------------------------------------------------

const NAV_WIDTH_LG = 320;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#E9E6E6",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------
const accountAdmin = {
  displayName: "Administrador PropTech",
  email: "demo@minimals.cc",
  photoURL: logoIcon,
  rol: "Control Total",
};

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard/app",
    icon: <QueryStatsIcon />,
  },
  {
    title: "Clientes",
    path: "/dashboard/users",
    icon: <GroupsIcon />,
  },
  {
    title: "Brokers",
    path: "/dashboard/brokers",
    icon: <PermContactCalendarIcon />,
  },
  {
    title: "Propiedades",
    path: "/dashboard/properties",
    icon: <MapsHomeWorkIcon />,
  },
  {
    title: "Comentarios",
    path: "/dashboard/reviews",
    icon: <ReviewsIcon />,
  },
];

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        backgroundColor: "#CFCFCF",
        height: 1,
        "& .simplebar-content": { height: 1, display: "flex", flexDirection: "column" },
      }}
    >
      <Box sx={{ p: 4, display: "inline-flex" }}>
        <img src={Logo} />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={accountAdmin.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {accountAdmin.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {accountAdmin.rol}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH_LG },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: { lg: NAV_WIDTH_LG },
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: { lg: NAV_WIDTH_LG } },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
