import "./HomeWorkCSS.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetPropertiesQuery } from "../../reduxToolkit/apiSlice";

export const BrokerHome = () => {
  //CONDICIONAL SECCIONES......
  const [seccion, setSeccion] = useState("data");

  const [navSeccion, setNavSeccion] = useState(false);
  //CONDICIONAL NAV.......
  const [navPage, setNavPage] = useState("");
  //GET PROPIEDADES........
  const { data: properties, isLoading, isError } = useGetPropertiesQuery();

  //BUSCADOR DE PROPIEDAD.....
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

  const [background, setBackGround] = useState("00B894");
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
                setNavPage("propiedades");
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
                setNavSeccion(false);
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
          <img src="/casa.png" alt="" />
          <img src="/cliente.png" alt="" />
          <img src="/seña.png" alt="" />
          <img src="/mensaje.png" alt="" />
        </div>

        {/* ASIDE */}
        {!navSeccion && (
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
                  <div className="arriba1" style={{ background }}>
                    div 1
                  </div>
                  <div className="arriba1" style={{ background }}>
                    div 2
                  </div>
                </div>
                <div className="abajo" style={{ background }}>
                  asd
                </div>
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
                <section className="mensaje1" style={{ background }}>
                  <h2 className="m1">Bandeja de Entrada</h2>
                  <div className="contain">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                </section>

                <section className="mensaje1" style={{ background }}>
                  <h2 className="m1">Enviar Mensaje</h2>
                  <textarea className="message-input"></textarea>
                  <button className="send-button">Enviar</button>
                </section>
              </div>
            )}

            {/* SECCION INFORMES */}
            {seccion == "informes" && (
              <div className="aside2">
                <div className="abajo" style={{ background }}>
                  asd
                </div>
                <div className="arriba">
                  <div className="arriba1" style={{ background }}>
                    div 1
                  </div>
                  <div className="arriba1" style={{ background }}>
                    div 2
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* SECCION */}
        {navPage == "propiedades" && (
          <div className="propiedades">
            <div className="buscar">
              <label className="b1">Buscar</label>
              <input className="b1" value={searchTerm} onChange={handleSearchChange} />
            </div>
            <div className="list-prop-main">
              {filteredProperties.length === 0 ? (
                <div>No se encontraron propiedades.</div>
              ) : (
                filteredProperties.map((property) => (
                  <div className="list-prop" key={property.id}>
                    <img src={property.pictures[0].img} alt="" />
                    <p>{property.address}</p>
                    <p>{property.id}</p>
                  </div>
                ))
              )}

              <div>
                {isLoading ? (
                  <div>Cargando propiedades...</div>
                ) : isError ? (
                  <div>Error al cargar las propiedades.</div>
                ) : (
                  <div>
                    {/* Aquí puedes utilizar la información obtenida */}
                    {properties.map((property) => (
                      <div className="list-prop">
                        <img src={property.pictures[0].img} alt="" />
                        <p>{property.address}</p>
                        <p>{property.id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
