// Cliente

const [searchTermClient, setSearchTermClient] = useState("");

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
