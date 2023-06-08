import "./HomeWorkCSS.css";
import { auth } from "../../firebase/firebase";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { modifyForm } from "../../reduxToolkit/forminterfaces";
import "./PieChart.css";
import PieChart from "./Estadisticas";
import { modifySignal } from "../../reduxToolkit/signalInterface";
import { putPropertyRequest } from "../../reduxToolkit/propertyinterfaces";
import {
  usePutSignalMutation,
  useGetPropertiesQuery,
  useGetUserQuery,
  useUpdatePropertyMutation,
  useGetSignalQuery,
  useGetfromQuery,
  usePutFormMutation,
} from "../../reduxToolkit/apiSlice";
import { User } from "../../reduxToolkit/userInterface";

export const BrokerHome = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  //MANEJO ERRORES FORM

  //Boton desplega navbar en mobile

  const [navMobile, setNavMobile] = useState(false);

  //CONDICIONAL SECCIONES......
  const [seccion, setSeccion] = useState("cuenta");

  const [navSeccion, setNavSeccion] = useState(false);
  //CONDICIONAL NAV.......
  const [navPage, setNavPage] = useState("");
  //GET PROPIEDADES........
  const { data: properties, isLoading, isError } = useGetPropertiesQuery();
  const { data: clients } = useGetUserQuery();
  //GET SIGNAL
  const { data: signals } = useGetSignalQuery();
  //GET FORM
  const { data: forms } = useGetfromQuery();
  const [updateForm] = usePutFormMutation();
  //BUSCADOR.....
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 20) {
      setSearchTerm(inputValue);
    }
  };

  const filteredProperties = properties?.filter((property) =>
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const EstadisticasVivienda = filteredProperties?.filter((prop) => prop.type == "Vivienda");
  const EstadisticasIndustria = filteredProperties?.filter((prop) => prop.type == "Industria");
  const EstadisticasLocal = filteredProperties?.filter((prop) => prop.type == "Local");
  const EstadisticasOficina = filteredProperties?.filter((prop) => prop.type == "Oficina");
  // TIPOS DE COLOR..................................................
  const colorOptions = [
    { value: "red", label: "Rojo" },
    { value: "green", label: "Verde" },
    { value: "blue", label: "Azul" },
    { value: "shadow", label: "naranja" },
    { value: "violet", label: "amarillo" },
  ];

  const [background, setBackGround] = useState("linear-gradient(45deg, #690d14, #f91942, #690d14)");
  const handleColorChange = (event: any) => {
    const e = event.target.value;
    let gradient = "";

    if (e === "red") {
      gradient = "linear-gradient(45deg, #690d14, #f91942, #690d14)";
    } else if (e === "green") {
      gradient = "linear-gradient(45deg, #155723, #2ac346, #155723)";
    } else if (e === "blue") {
      gradient = "linear-gradient(45deg, #063c64, #1c85d6, #063c64)";
    } else if (e === "shadow") {
      gradient = "linear-gradient(45deg, #454545, #999999, #454545)";
    } else if (e === "violet") {
      gradient = "linear-gradient(45deg, #371b4f, #8b5fbf, #371b4f)";
    }

    setBackGround(gradient);
  };
  const handleSection = (section: any) => {
    setSeccion(section.target.value);
  };
  //...................................................................

  //DETALLE DE PROPIEDAD
  const [updateProperty] = useUpdatePropertyMutation();

  const [selectedProperty, setSelectedProperty] = useState(null);

  const showPropertyDetails = (property: any) => {
    setSelectedProperty(property);
    setSeccion("detalle");
  };

  //COMPONENTE
  const [succesProperty, setPropertySignal] = useState(false);

  const PropertyDetails = ({ property }) => {
    const [editedProperty, setEditedProperty] = useState(property);
    const [error2, setError2] = useState({});
    const handleInputChange = (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
      fieldName: string
    ) => {
      let value = e.target.value;
      var str = new RegExp(/^[A-Za-z0-9\s]+$/g);
      var res = str.test(e.target.value);
      var valid = true;
      if (value === "") {
        setEditedProperty({ ...editedProperty, [fieldName]: "" });
      }
      if (fieldName === "address" || fieldName === "owner") {
        if (value.length > 50) {
          valid = false;
          return setError2({ error: "El campo excede la longitud máxima de 50 caracteres" });
        }
      } else if (fieldName === "description") {
        if (value.length > 500) {
          valid = false;
          return setError2({ error: "El campo excede la longitud máxima de 500 caracteres" });
        }
      } else if (fieldName === "spaces") {
        if (value > 100) {
          valid = false;
          return setError2({
            error: "El valor de espacios no puede ser mayor que el valor de baños o habitaciones",
          });
        }
      } else if (fieldName === "bathroom" || fieldName === "bedroom") {
        if (value > 100) {
          valid = false;
          return setError2({
            error: "El valor de baños o habitaciones no puede ser mayor que el valor de espacios",
          });
        }
      } else if (fieldName === "floors" || fieldName === "antiquity") {
        if (value > 100) {
          valid = false;
          return setError2({
            error: "El valor de baños o habitaciones no puede ser mayor que el valor de espacios",
          });
        }
      } else if (
        fieldName === "price" ||
        fieldName === "covered_area" ||
        fieldName === "total_area"
      ) {
        if (value > 1000000) {
          valid = false;
          return setError2({ error: "El campo excede precio permitido" });
        }
      }
      if (value) setEditedProperty({ ...editedProperty, [fieldName]: value });
    };

    const handleSaveChanges = async () => {
      try {
        const prop = editedProperty;
        if (prop !== null) {
          const newProp: putPropertyRequest = {
            id: prop.id,
            type: prop.type,
            address: prop.address,
            spaces: prop.spaces,
            price: prop.price,
            pictures: prop.pictures,
            floors: prop.floors,
            covered_area: prop.covered_area,
            bathroom: prop.bathroom,
            bedroom: prop.bedroom,
            furnished: prop.furnished,
            description: prop.description,
            situation: prop.situation,
            total_area: prop.total_area,
            antiquity: prop.antiquity,
            operation: prop.operation,
            owner: prop.ow,
          };
          updateProperty({ id: prop.id, updatedProperty: newProp });
        }
      } catch (error) {
        console.error("Error al actualizar la propiedad:", error);
        // Manejar el error de alguna manera, mostrar un mensaje de error, etc.
      }
    };

    return (
      <div className="property-details">
        <h2>{property.id}</h2>
        <div className="imagen-prop">
          <img src={property.pictures[0].img} alt="#" />
        </div>
        <p>
          <strong>Dirección:</strong>
          <input
            type="text"
            value={editedProperty.address}
            onChange={(e) => handleInputChange(e, "address")}
          />
        </p>
        <p>
          <strong> Descripción objetiva:</strong>
          <input
            type="text"
            value={editedProperty.description}
            onChange={(e) => handleInputChange(e, "description")}
          />
        </p>
        <p>
          <strong>Amoblado</strong>
          <select name="" id="" onChange={(e) => handleInputChange(e, "furnished")}>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </p>

        <p>
          <strong>Precio:</strong>
          <input
            type="number"
            value={editedProperty.price}
            onChange={(e) => handleInputChange(e, "price")}
          />
        </p>

        <p>
          <strong>Ambientes:</strong>
          <input
            type="number"
            value={editedProperty.spaces}
            onChange={(e) => handleInputChange(e, "spaces")}
          />
        </p>
        <p>
          <strong>Antigüedad:</strong>
          <input
            type="number"
            value={editedProperty.antiquity}
            onChange={(e) => handleInputChange(e, "antiquity")}
          />
        </p>
        <p>
          <strong>Baños:</strong>
          <input
            type="number"
            value={editedProperty.bathroom}
            onChange={(e) => handleInputChange(e, "bathroom")}
          />
        </p>
        <p>
          <strong>Cuartos:</strong>
          <input
            type="number"
            value={editedProperty.bedroom}
            onChange={(e) => handleInputChange(e, "bedroom")}
          />
        </p>
        <p>
          <strong>Área Cubierta:</strong>
          <input
            type="number"
            value={editedProperty.covered_area}
            onChange={(e) => handleInputChange(e, "covered_area")}
          />
        </p>
        <p>
          <strong>Área Total:</strong>
          <input
            type="number"
            value={editedProperty.total_area}
            onChange={(e) => handleInputChange(e, "total_area")}
          />
        </p>
        <p>
          <strong>Dueño:</strong>
          <input
            type="string"
            value={editedProperty.owner}
            onChange={(e) => handleInputChange(e, "owner")}
          />
        </p>
        <p>
          <strong>Disponibilidad</strong>
          <select name="" id="" onChange={(e) => handleInputChange(e, "situation")}>
            <option value="Disponible">Disponible</option>
            <option value="No Disponible">No Disponible</option>
          </select>
        </p>

        <p>
          <strong>Selecciona un tipo:</strong>
          <select value={editedProperty.type} onChange={(e) => handleInputChange(e, "type")}>
            <option value="Vivienda">Vivienda</option>
            <option value="Oficina">Oficina</option>
            <option value="Local">Local</option>
            <option value="Industria">Industria</option>
          </select>
        </p>
        {succesProperty && <div>Propiedad actualizada correctamente</div>}
        {error2?.error && <p>{error2.error}</p>}
        <button
          onClick={() => {
            setPropertySignal(true);
            handleSaveChanges();
          }}
        >
          Guardar Cambios
        </button>
        <button
          onClick={() => {
            setSelectedProperty(null);
            setSeccion("propiedades");
          }}
        >
          Cerrar
        </button>
      </div>
    );
  };
  // Cliente

  const filteredClientsList = clients?.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedClient, setSelectedClient] = useState(null);

  const handleClientSelection = (client: SetStateAction<null> | User) => {
    setSelectedClient(client);
    setSeccion("detalle-cliente");
  };

  const ClientDetails = ({ client }) => {
    return (
      <div className="client-details">
        <div className="card">
          <div>ID: {client.id}</div>
          <div>Rol: {client.rol}</div>
          <div>Email: {client.email}</div>
          {client.password && <div>Password: {client.password}</div>}
          <div>Tipo de persona: {client.person_type}</div>
          <div>Nombre: {client.name}</div>
          <img src={client.avatar} alt="Avatar" />
          <button
            className="user-botom"
            onClick={() => {
              setSelectedClient(null);
              setSeccion("clientes");
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };

  //DETALLE DE FORM
  //  const [updateForm] = useUpdatePropertyMutation();

  const [editedForm, setEditedForm] = useState(forms);

  const handleFormSelection = (form: SetStateAction<null>) => {
    setSelectedForm(form);
    setSeccion("form-detalle");
  };

  //COMPONENTE FORM

  // SEÑAS !!
  const [updateSignal] = usePutSignalMutation();

  const filteredSignalList = signals?.filter((signal) =>
    signal.operation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedSignal, setSelectedSignal] = useState(null);
  const [succesSignal, setSuccesSignal] = useState(false);
  const [deniedSignal, setDeniedSignal] = useState(false);

  const [succesForm, setSuccesForm] = useState(false);
  const [deniedForm, setDeniedForm] = useState(false);

  const handleSignalSelection = (signal: any) => {
    setSelectedSignal(signal);
    setSeccion("detalle-signal");
  };

  // IMPORTANTE/---------------------------------------------------------------------------------------------------------------
  const SignalDetails = ({ signal }) => {
    const handleSaveChangesSignal = async (e: string) => {
      try {
        const signa = signal;
        if (e == "aceptar") {
          const newSignal: modifySignal = {
            id: signa.id,
            situation: "Aceptado",
          };
          updateSignal({ id: signa.id, situation: newSignal.situation });
        }
        if (e == "rechazar") {
          const newSignal: modifySignal = {
            id: signa.id,
            situation: "Rechazado",
          };
          updateSignal({ id: signa.id, situation: newSignal.situation });
        }
      } catch (error) {
        console.error("Error:", error);
        // Manejar el error de alguna manera, mostrar un mensaje de error, etc.
      }
    };

    return (
      <div className="client-details">
        <h2>ID: {signal.id}</h2>
        <p>
          <strong>Operacion:</strong>
          <strong>{signal.operation}</strong>
        </p>
        <p>
          <strong>Precio:</strong>
          <strong>{signal.price}</strong>
        </p>

        <p>
          <strong>Id de propiedad:</strong>
          <strong>{signal.propertyId}</strong>
        </p>
        <p>
          <strong>Situacion:</strong>
          <strong>{signal.situation}</strong>
        </p>
        <button
          value="aceptar"
          onClick={(e) => {
            handleSaveChangesSignal(e.target.value);
            setSuccesSignal(true);
            setDeniedSignal(false);
          }}
        >
          Aceptar
        </button>
        <button
          value="rechazar"
          onClick={(e) => {
            setSuccesSignal(false);
            setDeniedSignal(true);
            handleSaveChangesSignal(e.target.value);
          }}
        >
          Denegar
        </button>

        <button
          onClick={() => {
            setSelectedSignal(null);
            setSuccesSignal(false);
            setSeccion("seña");
          }}
        >
          Cerrar
        </button>
        {succesSignal && <div>Seña aprobada correctamente</div>}
        {deniedSignal && <div>Seña rechazada correctamente</div>}
      </div>
    );
  };

  const FormDetails = ({ form }) => {
    const handleSaveChangesForm = async (e: string) => {
      try {
        if (e == "aceptar") {
          const newForm: modifyForm = {
            id: form.id,
            situation: "aceptada",
          };
          updateForm({ id: newForm.id, situation: newForm.situation });
        }
        if (e == "rechazar") {
          const newForm: modifyForm = {
            id: form.id,
            situation: "rechazada",
          };
          updateForm({ id: form.id, situation: newForm.situation });
        }
      } catch (error) {
        console.error("Error:", error);
        // Manejar el error de alguna manera, mostrar un mensaje de error, etc.
      }
    };

    return (
      <div className="client-details">
        <div className="card">
          <div>Title: {form.title}</div>
          <div>Description: {form.description}</div>
          <div>Picture URLs: {form.picture_url.join(", ")}</div>
          <div>Unit Price: {form.unit_price}</div>
          <div>DNI: {form.dni}</div>
          <div>Tel: {form.tel}</div>
          <div>Type of Property: {form.type_prop}</div>
          <div>Type of Housing: {form.type_vivienda}</div>
          <div>Address: {form.address}</div>
          <div>Number: {form.number}</div>
          <div>Apartment: {form.apartment}</div>
          <div>Floor: {form.floor}</div>
          <div>Location: {form.location}</div>
          <div>Province: {form.province}</div>
          <div>Postal Code: {form.postalCode}</div>
          <div>Email: {form.email}</div>
          <p>
            <strong>Situacion:{form.situation}</strong>
            <strong>{form.situation}</strong>
          </p>
          <button
            value="aceptar"
            onClick={(e) => {
              handleSaveChangesForm(e.target.value);
              localStorage.setItem("broker", "100");
              setSuccesForm(true);
              setDeniedForm(false);
            }}
          >
            Aceptar
          </button>
          <button
            value="rechazar"
            onClick={(e) => {
              handleSaveChangesForm(e.target.value);
              setSuccesForm(false);
              setDeniedForm(true);
            }}
          >
            Denegar
          </button>

          <button
            onClick={() => {
              setSelectedForm(null);
              setSuccesForm(false);
              setSeccion("form");
            }}
          >
            Cerrar
          </button>
          {succesForm && <div>Operación aprobada correctamente</div>}
          {deniedForm && <div>Operación rechazada correctamente</div>}
        </div>
        <button
          onClick={() => {
            setSelectedForm(null);
            setSeccion("form");
          }}
        >
          Cerrar
        </button>
      </div>
    );
  };

  const chartData = [
    {
      label: `Oficinas ${EstadisticasOficina?.length}`,
      value: EstadisticasOficina?.length,
      color: "#FFCE56",
    },
    {
      label: `Locales ${EstadisticasLocal?.length}`,
      value: EstadisticasLocal?.length,
      color: "#36A2EB",
    },
    {
      label: `Industrias ${EstadisticasIndustria?.length}`,
      value: EstadisticasIndustria?.length,
      color: "#FF6384",
    },
    {
      label: `Viviendas ${EstadisticasVivienda?.length}`,
      value: EstadisticasVivienda?.length,
      color: "#FF5733",
    },
  ];

  return (
    <div className="total" style={{ background }}>
      <div className="admin">
        {/* NADVAR */}
        <nav className="nav">
          <div className="nav_btn">
            <Link to={"https://dolarhoy.com/"} target="_BLANK">
              <img src="/dolar.png" className="dolar" />
            </Link>
            <Link
              onClick={() => {
                setNavSeccion(true);
                setSeccion("propiedades");
              }}
              className="HomeWork"
              to={"/broker"}
            >
              <div className="icono">
                <img className="icon-two" src="/casa.png" />
              </div>
              Propiedades
            </Link>
            <Link
              onClick={() => {
                setSeccion("clientes");
                setNavPage("");
              }}
              className="HomeWork"
              to={"/broker"}
            >
              <div className="icono">
                <img className="icon-two" src="/cliente.png" />
              </div>
              Clientes
            </Link>
            <Link
              onClick={() => {
                setSeccion("seña");
                setNavPage("");
              }}
              className="HomeWork"
              to={"/broker"}
            >
              <div className="icono">
                <img className="icon-two" src="/seña.png" />
              </div>
              Señas
            </Link>
            <Link
              onClick={() => {
                setSeccion("form");
                setNavPage("");
              }}
              className="HomeWork"
              to={"/broker"}
            >
              <div className="icono">
                <img className="icon-two" src="/mensaje.png" />
              </div>
              Operaciones
            </Link>
          </div>
          <div className="container" style={{ background }}>
            <label>Elige un color:</label>
            <select id="color-select" onChange={handleColorChange}>
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </nav>

        {/* NAV MOBILE*/}
        <div className="nav_mobile">
          <img onClick={() => setSeccion("propiedades")} src="/casa.png" alt="" />
          <img onClick={() => setSeccion("cuenta")} src="/cliente.png" alt="" />
          <img onClick={() => setSeccion("seña")} src="/seña.png" alt="" />
          <img onClick={() => setSeccion("form")} src="/mensaje.png" alt="" />
        </div>

        {/* ASIDE */}

        <section className="conteiner">
          <div className="aside">
            <button value={"cuenta"} onClick={(c) => handleSection(c)}>
              Cuenta
            </button>
            <button value={"mensaje"} onClick={(m) => handleSection(m)}>
              Mensaje
            </button>

            <Link to={"/home"}>
              <button className="botonsuelto" value={"cerrar"} onClick={(c) => handleSection(c)}>
                Cerrar Session
              </button>
            </Link>
          </div>

          {/* SECCION DATA
          {seccion == "data" && (
            <div className="aside2">
              <div className="arriba">
                <div className="arriba1">
                  <PieChart data={chartData}></PieChart>
                </div>
                <div className="arriba1">div 2</div>
              </div>
              <div className="abajo">asd</div>
            </div>
          )} */}

          {/* SECCION CUENTA */}
          {seccion == "cuenta" && (
            <div className="card">
              <div className="card-arriba">
                <img
                  src="https://www.pngkit.com/png/full/115-1150342_user-avatar-icon-iconos-de-mujeres-a-color.png"
                  alt=""
                />
                <div className="card-abajo">
                  {/* <h2>{broker.id}</h2> */}
                  <h2>Area</h2>
                  <h3>ID: 4037#</h3>
                </div>
                <div className="card-abajo">
                  <h2>azschiaffino@gmail.com</h2>
                  <a style={{ color: "whitesmoke" }} href="#">
                    Cambiar contraseña
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* SECCION MENSAJE */}
          {seccion == "mensaje" && (
            <div className="mensaje">
              <section className="mensaje1">
                <h2 className="m1">Bandeja de Entrada</h2>
                <div className="contain">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </div>
              </section>

              <section className="mensaje1">
                <h2 className="m1">Enviar Mensaje</h2>
                <textarea className="message-input"></textarea>
                <button className="send-button">Enviar</button>
              </section>
            </div>
          )}

          {/* SECCION INFORMES */}
          {seccion == "informes" && (
            <div className="aside2">
              <div className="abajo">asd</div>
              <div className="arriba">
                <div className="arriba1">div 1</div>
                <div className="arriba1">div 2</div>
              </div>
            </div>
          )}
          {/* SECCION DETALLE */}
          {seccion === "detalle" && selectedProperty && (
            <PropertyDetails property={selectedProperty} />
          )}
          {seccion == "propiedades" && (
            <div className="propiedades">
              <div className="buscar">
                <input
                  className="b1"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="luist-prop-main">
                {filteredProperties?.length === 0 ? (
                  <div>No se encontraron propiedades.</div>
                ) : (
                  filteredProperties?.map((property: any) => (
                    <div
                      className="list-prop"
                      key={property.id}
                      onClick={() => showPropertyDetails(property)}
                    >
                      <img src={property.pictures[0].img} alt="" />
                      <p>{property.address}</p>
                      <p>{property.id}</p>
                    </div>
                  ))
                )}
                <div>
                  {isLoading ? (
                    <div>Cargando propiedades...</div>
                  ) : (
                    isError && <div>Error al cargar las propiedades.</div>
                  )}
                </div>
              </div>
            </div>
          )}
          {seccion === "detalle-cliente" && <ClientDetails client={selectedClient} />}

          {seccion === "clientes" && (
            <div className="propiedades">
              <div className="buscar">
                <input
                  className="b1"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="luist-prop-main">
                {isLoading ? (
                  <div>Cargando clientes...</div>
                ) : isError ? (
                  <div>Error al cargar los clientes.</div>
                ) : (
                  filteredClientsList?.map((client) => (
                    <div
                      className="list-prop"
                      key={client.id}
                      onClick={() => {
                        handleClientSelection(client);
                      }}
                    >
                      <img src={client.avatar} />
                      <p>{client.name}</p>
                      <p>{client.email}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* DETALES SENAS ----------------------------------------------------------------------------------------- */}

          {seccion === "detalle-signal" && <SignalDetails signal={selectedSignal} />}
          {seccion === "seña" && (
            <div className="propiedades">
              <div className="buscar">
                <input
                  className="b1"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="luist-prop-main">
                {isLoading ? (
                  <div>Cargando señas...</div>
                ) : isError ? (
                  <div>Error al cargar las señas...</div>
                ) : (
                  filteredSignalList?.map((signal) => (
                    <div
                      className="list-prop"
                      key={signal.id}
                      onClick={() => {
                        handleSignalSelection(signal);
                      }}
                    >
                      <img
                        src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
                        alt=""
                      />

                      <p>{signal.price}</p>
                      <p>{signal.operation}</p>
                      <p>{signal.propertyId}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {seccion === "form-detalle" && <FormDetails form={selectedForm} />}
          {seccion === "form" && (
            <div className="propiedades">
              <div className="buscar">
                <input
                  className="b1"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="luist-prop-main">
                {isLoading ? (
                  <div>Cargando Consultas...</div>
                ) : isError ? (
                  <div>Error al cargar las consultas...</div>
                ) : (
                  forms?.map((form: any) => (
                    <div
                      className="list-prop"
                      key={form.id}
                      onClick={() => {
                        handleFormSelection(form);
                      }}
                    >
                      <img src="/form1.png" alt="" />

                      <p>{form.address}</p>
                      <p>{form.tel}</p>
                      <p>{form.email}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>
        {/* DETALES FORM ----------------------------------------------------------------------------------------- */}

        {/* SECCION */}
      </div>
      {!navMobile && (
        <button className="boton-nav-mobile" onClick={() => setNavMobile(true)}>
          <img className="menu-icon" src="https://cdn.onlinewebfonts.com/svg/img_251231.png"></img>
        </button>
      )}
      {navMobile && (
        <div className="aside-mobile">
          <button onClick={() => setNavMobile(false)}>Volver</button>
          <button
            value={"data"}
            onClick={(d) => {
              handleSection(d);
              setNavMobile(false);
            }}
          >
            Data
          </button>
          <button
            value={"cuenta"}
            onClick={(c) => {
              handleSection(c);
              setNavMobile(false);
            }}
          >
            Cuenta
          </button>
          <button
            value={"mensaje"}
            onClick={(m) => {
              handleSection(m);
              setNavMobile(false);
            }}
          >
            Mensaje
          </button>

          <button
            value={"cerrar"}
            onClick={(c) => {
              handleSection(c);
              setNavMobile(false);
            }}
          >
            Cerrar Session
          </button>
        </div>
      )}
    </div>
  );
};
