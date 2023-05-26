
const PropertyDetails = (selectedProperty) => {
  if (!selectedProperty) {
    return null; // No hay propiedad seleccionada, no se muestra nada
  }

  return (
    <div className="property-details">
      {/* Renderiza la información detallada de la propiedad */}
      <h2>{selectedProperty.address}</h2>
      <p>{selectedProperty.description}</p>
      {/* Otros campos de la propiedad */}
    </div>
  );
};