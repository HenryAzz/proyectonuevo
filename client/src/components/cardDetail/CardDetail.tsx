import { useParams } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../../reduxToolkit/apiSlice";

export const CardDetail = () => {
  const { id } = useParams();

  const idProperty: number = parseInt(id);
  console.log(typeof idProperty);

  const { data, isLoading } = useGetPropertyByIdQuery(idProperty);

  console.log(data);

  return <>Componente de detalles</>;
};
