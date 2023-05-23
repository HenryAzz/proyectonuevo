import "./HomeWorkCSS.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createPropertyRequest, putPropertyRequest } from "../../reduxToolkit/propertyinterfaces";
import {
  useGetPropertiesQuery,
  useGetUserQuery,
  useUpdatePropertyMutation,
} from "../../reduxToolkit/apiSlice";

export const BrokerHome = () => {
  //Boton desplega navbar en mobile

  const [navMobile, setNavMobile] = useState(false);

  //CONDICIONAL SECCIONES......
  const [seccion, setSeccion] = useState("data");

  const [navSeccion, setNavSeccion] = useState(false);
  //CONDICIONAL NAV.......
  const [navPage, setNavPage] = useState("");
  //GET PROPIEDADES........
  const { data: properties, isLoading, isError } = useGetPropertiesQuery();
  const { data: clients } = useGetUserQuery();

  //BUSCADOR.....
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProperties = properties?.filter((property) =>
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // TIPOS DE COLOR..................................................
  const colorOptions = [
    { value: "red", label: "Rojo" },
    { value: "green", label: "Verde" },
    { value: "blue", label: "Azul" },
    { value: "shadow", label: "Sombra" },
    { value: "violet", label: "Violeta" },
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
  // const [deletPropertyByID] = useDeletPropertyByIDMutation()

  const [selectedProperty, setSelectedProperty] = useState(null);

  const showPropertyDetails = (property) => {
    setSelectedProperty(property);
    setSeccion("detalle");
  };
  //COMPONENTE

  const PropertyDetails = ({ property }) => {
    const [editedProperty, setEditedProperty] = useState(property);

    const handleInputChange = (e, field) => {
      const value = e.target.value;
      setEditedProperty((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };
    // const handleDeleteProperty = async () => {
    //   deletPropertyByID(property.id)
    // }

    const handleSaveChanges = async () => {
      try {
        const prop = editedProperty;
        console.log(prop);
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
            owner: "Schiaffino",
          };
          console.log(newProp);
          updateProperty({ id: prop.id, updatedProperty: newProp }).catch((error) =>
            console.log(error)
          );
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
          <img
            src="https://static.tokkobroker.com/water_pics/12190680294349488921225897790339312569650718240135235184392601498084859419584.jpg"
            alt="#"
          />
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
            value={editedProperty.covered_area}
            onChange={(e) => handleInputChange(e, "total_area")}
          />
        </p>
        <p>
          <strong>Dueño:</strong>
          <input
            type="string"
            value={editedProperty.covered_area}
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
        {/* <button
          onClick={() => {
            handleDeleteProperty();
            getProperties();
          }}
        >
          delete
        </button> */}
        <button
          onClick={() => {
            handleSaveChanges();
            getProperties();
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

  const handleClientSelection = (client) => {
    setSelectedClient(client);
    setSeccion("detalle-cliente");
  };

  const ClientDetails = ({ client }) => {
    const [editedClient, setEditedClient] = useState(client);

    const handleInputChange = (e, field) => {
      const value = e.target.value;
      setEditedClient((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };

    const handleSaveChanges = async () => {
      try {
        const result = await updateClient({
          id: selectedClient.id,
          updatedClient: editedClient,
        });
        console.log("Cliente actualizado:", result.data);
      } catch (error) {
        console.error("Error al actualizar el cliente:", error);
      }
    };

    return (
      <div className="client-details">
        <h2>{client.id}</h2>
        <p>
          <strong>Nombre:</strong>
          <input
            type="text"
            value={editedClient.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
        </p>
        <p>
          <strong>Correo Electrónico:</strong>
          <input
            type="email"
            value={editedClient.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
        </p>

        <button onClick={() => handleSaveChanges()}>Guardar Cambios</button>
        <button
          onClick={() => {
            setSelectedClient(null);
            setSeccion("clientes");
          }}
        >
          Cerrar
        </button>
      </div>
    );
  };

  // SEÑAS !!

  //   const filteredSignalList = Signal?.filter((client) =>
  //   client.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const [selectedClient, setSelectedClient] = useState(null);

  // const handleSignalSelection = (client) => {
  //   setSelectedClient(client);
  //   setSeccion("detalle-cliente");
  // };

  // const ClientDetails = ({ client }) => {
  //   const [editedClient, setEditedClient] = useState(client);

  //   const handleInputChange = (e, field) => {
  //     const value = e.target.value;
  //     setEditedClient((prevState) => ({
  //       ...prevState,
  //       [field]: value,
  //     }));
  //   };

  //   const handleSaveChanges = async () => {
  //     try {
  //       const result = await updateClient({
  //         id: selectedClient.id,
  //         updatedClient: editedClient,
  //       });
  //       console.log("Cliente actualizado:", result.data);
  //     } catch (error) {
  //       console.error("Error al actualizar el cliente:", error);
  //     }
  //   };

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
            <Link className="HomeWork" to={"/broker"}>
              <div className="icono">
                <img className="icon-two" src="/seña.png" />
              </div>
              Señas
            </Link>
            <Link className="HomeWork" to={"/broker"}>
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
          <img onClick={() => setSeccion("mensaje")} src="/mensaje.png" alt="" />
        </div>

        {/* ASIDE */}

        <section className="conteiner">
          <div className="aside">
            <button value={"data"} onClick={(d) => handleSection(d)}>
              Data
            </button>
            <button value={"cuenta"} onClick={(c) => handleSection(c)}>
              Cuenta
            </button>
            <button value={"mensaje"} onClick={(m) => handleSection(m)}>
              Mensaje
            </button>
            <button value={"informes"} onClick={(i) => handleSection(i)}>
              Informes
            </button>
            <button value={"cerrar"} onClick={(c) => handleSection(c)}>
              Cerrar Session
            </button>
          </div>

          {/* SECCION DATA */}
          {seccion == "data" && (
            <div className="aside2">
              <div className="arriba">
                <div className="arriba1">div 1</div>
                <div className="arriba1">div 2</div>
              </div>
              <div className="abajo">asd</div>
            </div>
          )}

          {/* SECCION CUENTA */}
          {seccion == "cuenta" && (
            <div className="card">
              <div className="card-arriba">
                <img
                  src="https://www.pngkit.com/png/full/115-1150342_user-avatar-icon-iconos-de-mujeres-a-color.png"
                  alt=""
                />
                <div className="card-abajo">
                  <h2>Azul Schiaffino</h2>
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
                <label className="b1">Buscar</label>
                <input className="b1" value={searchTerm} onChange={handleSearchChange} />
              </div>

              <div className="luist-prop-main">
                {filteredProperties.length === 0 ? (
                  <div>No se encontraron propiedades.</div>
                ) : (
                  filteredProperties.map((property: any) => (
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
                <label className="b1">Buscar</label>
                <input className="b1" value={searchTerm} onChange={handleSearchChange} />
              </div>
              <div className="luist-prop-main">
                {isLoading ? (
                  <div>Cargando clientes...</div>
                ) : isError ? (
                  <div>Error al cargar los clientes.</div>
                ) : (
                  filteredClientsList.map((client) => (
                    <div
                      className="list-prop"
                      key={client.id}
                      onClick={() => {
                        handleClientSelection(client);
                        console.log(selectedClient);
                      }}
                    >
                      <img
                        src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
                        alt=""
                      />
                      <p>{client.name}</p>
                      <p>{client.id}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* DETALES SENAS ----------------------------------------------------------------------------------------- */}

          {seccion === "detalle-seña" && <ClientDetails client={selectedClient} />}
          {seccion === "seña" && (
            <div className="propiedades">
              <div className="buscar">
                <label className="b1">Buscar Seña</label>
                <input className="b1" value={searchTerm} onChange={handleSearchChange} />
              </div>
              <div className="luist-prop-main">
                {isLoading ? (
                  <div>Cargando señas...</div>
                ) : isError ? (
                  <div>Error al cargar las señas...</div>
                ) : (
                  filteredClientsList.map((client) => (
                    <div
                      className="list-prop"
                      key={client.id}
                      onClick={() => {
                        handleClientSelection(client);
                        console.log(selectedClient);
                      }}
                    >
                      <img
                        src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
                        alt=""
                      />
                      <p>{client.name}</p>
                      <p>{client.id}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>

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
            value={"informes"}
            onClick={(i) => {
              handleSection(i);
              setNavMobile(false);
            }}
          >
            Informes
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
