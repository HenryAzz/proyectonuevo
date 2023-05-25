import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import GroupsIcon from "@mui/icons-material/Groups";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
// sections
import {
  AppWebsiteVisits,
  AppWidgetSummary,
  AppConversionRates,
  AppProperties,
} from "../sections/@dashboard/app";
import {
  useGetBrokersQuery,
  useGetPropertiesQuery,
  useGetUsersQuery,
} from "../reduxTolkit/apiSlice";
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const {
    data: properties,
    isLoading: propertiesLoading,
    isError: propertiesError,
  } = useGetPropertiesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: client,
    isLoading: clientLoading,
    isError: clientError,
  } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: brokers,
    isLoading: brokersLoading,
    isError: brokersError,
  } = useGetBrokersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const theme = useTheme();
  if (propertiesError && clientError && brokersError) return <h1>No se pueden cargar los datos</h1>;
  if (propertiesLoading || clientLoading || brokersLoading) return <h4>Cargando...</h4>;

  let summaryData = [];

  if (!propertiesLoading && !clientLoading && !brokersLoading) {
    summaryData = [
      {
        title: "Propiedades",
        total: properties.length,
        color: "primary",
        icon: <MapsHomeWorkIcon />,
      },
      { title: "Clientes", total: client.length, color: "info", icon: <GroupsIcon /> },
      {
        title: "Brokers",
        total: brokers.length,
        color: "warning",
        icon: <PermContactCalendarIcon />,
      },
      { title: "Reviews", total: 234, color: "error", icon: <RateReviewIcon /> },
    ];
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | PropTech </title>
      </Helmet>

      <Container width="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bienvenido Administrador.
        </Typography>

        <Grid container spacing={3}>
          {summaryData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <AppWidgetSummary
                title={item.title}
                total={item.total}
                color={item.color}
                icon={item.icon}
              />
            </Grid>
          ))}

          <Grid item xs={12} md={6} lg={4}>
            {!propertiesLoading && (
              <AppProperties
                title="Tipo de Propiedades"
                chartData={[
                  {
                    label: "Vivienda",
                    value: properties.filter((e) => e.type === "Vivienda").length,
                  },
                  {
                    label: "Oficina",
                    value: properties.filter((e) => e.type === "Oficina").length,
                  },
                  {
                    label: "Local",
                    value: properties.filter((e) => e.type === "Local").length,
                  },
                  {
                    label: "Industria",
                    value: properties.filter((e) => e.type === "Industria").length,
                  },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                ]}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Visitas Web"
              subheader="Ultimas visitas"
              chartLabels={[
                "01/01/2003",
                "02/01/2003",
                "03/01/2003",
                "04/01/2003",
                "05/01/2003",
                "06/01/2003",
                "07/01/2003",
                "08/01/2003",
                "09/01/2003",
                "10/01/2003",
                "11/01/2003",
              ]}
              chartData={[
                {
                  name: "Team A",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: "Team B",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: "Team C",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Operaciones por Borker"
              subheader="Operaciones en el ultimo año"
              chartData={[
                {
                  label: "Broker david perez",
                  value: properties.filter((e) => e.type === "Vivienda").length,
                },
                { label: "Broker Japan", value: 430 },
                { label: "Broker China", value: 448 },
                { label: "Broker Canada", value: 470 },
                { label: "Broker France", value: 540 },
                { label: "Broker Germany", value: 700 },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
