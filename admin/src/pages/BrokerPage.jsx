import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Avatar,
  Modal,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// components
import Label from "../components/label";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// Redux
import {
  useCreateBrokerMutation,
  useDeleteBrokerMutation,
  useGetBrokersQuery,
  useUpdateBrokerMutation,
} from "../reduxTolkit/apiSlice";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "DNI", alignRight: false },
  { id: "name", label: "Nombre", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "rol", label: "Rol", alignRight: false },
  { id: "division", label: "Division", alignRight: false },
  { id: "actions", label: "Acciones", alignRight: false },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BrokerPage() {
  const { data, isLoading, isError } = useGetBrokersQuery();
  const [deleteBroker] = useDeleteBrokerMutation();
  const [createBroker] = useCreateBrokerMutation();
  const [updateBroker] = useUpdateBrokerMutation();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");

  const [formBroker, setFormBroker] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    division: "",
    rol: "broker",
  });

  const [select, setSelect] = useState("");

  const handleOpen = () => {
    setAction("");
    setFormBroker({ id: "", name: "", email: "", password: "", division: "", rol: "broker" });

    setOpen(true);
  };

  const handleEditor = (id, name, division, email) => {
    setFormBroker({ id, name, division, email });
    console.log(formBroker);
    setAction("Editar");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  if (isError) return <h1>Error al cargar los datos.</h1>;
  if (isLoading) return <h4>Cargando...</h4>;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOnchange = (e) => {
    setFormBroker({ ...formBroker, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formBroker);
    if (action === "Editar") updateBroker(formBroker);
    if (action !== "Editar") createBroker(formBroker);
    setFormBroker({ id: "", name: "", email: "", password: "", division: "", rol: "broker" });
    setSelect("");
  };

  const handleChangeSelect = (event) => {
    setSelect(event.target.value);
    setFormBroker({ ...formBroker, [event.target.name]: event.target.value });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Broker | PropTech </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Brokers
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
            Nuevo broker
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, rol, avatar, division, email } = row;
                      const selectedUser = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          rol="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell align="left">{id}</TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatar} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="left">{rol}</TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                (division === "local" && "error") ||
                                (division === "vivienda" && "success") ||
                                (division === "oficina" && "warning") ||
                                "info"
                              }
                            >
                              {sentenceCase(division)}
                            </Label>
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <MenuItem onClick={() => handleEditor(id, name, division, email)}>
                                <EditIcon />
                                Editar
                              </MenuItem>

                              <MenuItem
                                sx={{ color: "error.main" }}
                                onClick={() => deleteBroker(id)}
                              >
                                <DeleteForeverIcon />
                                Borrar
                              </MenuItem>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            No encontrado
                          </Typography>

                          <Typography variant="body2">
                            Ningun resultado para la busqueda &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Intente verificar errores tipográficos o usar palabras completas
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {action === "Editar" ? `${action} Broker` : "Crear Broker"}
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="DNI"
                  variant="outlined"
                  name="id"
                  value={formBroker.id}
                  type="text"
                  onChange={handleOnchange}
                  fullWidth
                  required
                  sx={{ my: 1 }}
                />
                <TextField
                  label="Nombre Completo"
                  variant="outlined"
                  name="name"
                  value={formBroker.name}
                  type="text"
                  onChange={handleOnchange}
                  fullWidth
                  required
                  sx={{ my: 1 }}
                />
                <TextField
                  label="Correo Electronico"
                  variant="outlined"
                  placeholder="nombreBroker@proptech.com"
                  name="email"
                  type="email"
                  value={formBroker.email}
                  onChange={handleOnchange}
                  fullWidth
                  required
                  sx={{ my: 1 }}
                />
                {action !== "Editar" && (
                  <TextField
                    label="Contraseña"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formBroker.password}
                    onChange={handleOnchange}
                    fullWidth
                    required
                    sx={{ my: 1 }}
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
                )}

                <FormControl fullWidth>
                  <InputLabel>Division</InputLabel>
                  <Select
                    name="division"
                    value={action === "Editar" ? formBroker.division : select}
                    label="Division"
                    onChange={handleChangeSelect}
                    fullWidth
                  >
                    <MenuItem value="local" name="local">
                      Local
                    </MenuItem>
                    <MenuItem value="vivienda" name="vivienda">
                      Vivienda
                    </MenuItem>
                    <MenuItem value="oficina" name="oficina">
                      Oficina
                    </MenuItem>
                    <MenuItem value="industria" name="industria">
                      Industria
                    </MenuItem>
                  </Select>
                </FormControl>

                <Stack direction="row" sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleClose} color="error">
                    Cerrar
                  </Button>
                  <Button variant="contained" type="submit" sx={{ ml: 1 }}>
                    Guardar
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Modal>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
