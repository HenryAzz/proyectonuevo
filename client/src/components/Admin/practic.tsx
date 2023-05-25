   const { data: signal, isLoading, isError } = useGetSignalQuery();

 // SEÑAS !!

 const filteredSignalList = signal?.filter((signa) =>
 signa.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const [selectedSignal, setSelectedSignal] = useState(null);

const handleSignalSelection = (signal) => {
 setSelectedSignal(signal);
 setSeccion("detalle-signal");
};

const SignalDetails = ({ signal }) => {
 const [editedSignal, setEditedSignal] = useState(signal);

 const handleInputChangeSignal = (e, field) => {
   const value = e.target.value;
   setEditedSignal((prevState) => ({
     ...prevState,
     [field]: value,
   }));
 };

//  const handleSaveChangesSignal = async () => {
//    try {
//      const result = await updateSignal({
//        id: selectedSignal.id,
//        updatedClient: editedSignal,
//      });
//      console.log("Seña actualizada:", result.data);
//    } catch (error) {
//      console.error("Error al actualizar la seña:", error);
//    }
//  };
 



return (
  <div className="client-details">
    <h2>{signal.id}</h2>
    <p>
      <strong>Nombre:</strong>
      <input
        type="text"
        value={editedSignal.name}
        onChange={(e) => handleInputChangeSignal(e, "name")}
      />
    </p>
    <p>
      <strong>Correo Electrónico:</strong>
      <input
        type="email"
        value={editedSignal.email}
        onChange={(e) => handleInputChangeSignal(e, "email")}
      />
    </p>

    <button onClick={() => handleInputChangeSignal()}>Guardar Cambios</button>
    <button
      onClick={() => {
        setSelectedSignal(null);
        setSeccion("signal");
      }}
    >
      Cerrar
    </button>
  </div>
);

 
 {/* DETALES SENAS ----------------------------------------------------------------------------------------- */}

 {seccion === "detalle-seña" && <SignalDetails client={selectedSignal} />}
 {seccion === "seña" && (
   <div className="propiedades">
     <div className="buscar">
       <label className="b1">Buscar Seña</label>
       <input className="b1" value={searchTerm} onChange={handleInputChangeSignal} />
     </div>
     <div className="luist-prop-main">
       {isLoading ? (
         <div>Cargando señas...</div>
       ) : isError ? (
         <div>Error al cargar las señas...</div>
       ) : (
        filteredSignalList.map((signal) => (
           <div
             className="list-prop"
             key={signal.id}
             onClick={() => {
               handleSignalSelection(signal);
               console.log(selectedSignal);
             }}
           >
             <img
               src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
               alt=""
             />
             <p>{signal.id}</p>
             <p>{signal.operation}</p>
             <p>{signal.situation}</p>

           </div>
         ))
       )}
     </div>
   </div>
 )}