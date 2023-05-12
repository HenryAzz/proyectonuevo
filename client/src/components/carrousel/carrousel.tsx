import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

type ItemProps = {
  img: string;
};

export const Carrousel = (images: any) => {
  console.log(images);

  return (
    <Carousel indicators={false}>
      {images.images.map((item: any, index: number) => (
        <Item key={index} img={item.img} />
      ))}
    </Carousel>
  );
};

const Item: React.FC<ItemProps> = ({ img }) => {
  return (
    <Paper>
      <img src={img} style={{ width: "100%", height: "400px" }} />
    </Paper>
  );
};
