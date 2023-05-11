import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

export const Carrousel = (data: any) => {
  console.log(data.data);

  return (
    <Carousel indicators={false}>
      {data.data.map((item: string, index: number) => (
        <Item key={index} img={item.img} />
      ))}
    </Carousel>
  );
};

const Item = ({ img }) => {
  return (
    <Paper>
      <img src={img} style={{ width: "100%", height: "400px" }} />
    </Paper>
  );
};
