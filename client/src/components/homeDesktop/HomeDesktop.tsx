import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export const HomeDesktop = () => {
  const [fetchedData, updateFetchedData] = useState([]);

  const api = `https://rickandmortyapi.com/api/character/`;

  useEffect(() => {
    (async function () {
      const data = await fetch(api).then((res) => res.json());
      updateFetchedData(data.results);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(fetchedData[0]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box display="flex" justifyContent="center" marginTop={20} sx={{ width: "75vw" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp"
                height="150"
                alt="imagen"
              />
              <CardContent>
                <Typography variant="h5" mt={1}>
                  Casa de Ensueño
                </Typography>
                <Typography component="p" variant="body2" mt={1}>
                  La casa de ensueño cuenta con 5 habitaciones, 5 y 1/2 baños, pileta y un gran
                  patio. Vení por la llave de la casa de tus sueños
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained">Hacer Reserva</Button>
              <Button variant="outlined">Mas Informacion</Button>
            </CardActions>
          </Card>

          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp"
                height="150"
                alt="imagen"
              />
              <CardContent>
                <Typography variant="h5" mt={1}>
                  Casa de Ensueño
                </Typography>
                <Typography component="p" variant="body2" mt={1}>
                  La casa de ensueño cuenta con 5 habitaciones, 5 y 1/2 baños, pileta y un gran
                  patio. Veni por la llave de la casa de tus sueños
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained">Hacer Reserva</Button>
              <Button variant="outlined">Más Información</Button>
            </CardActions>
          </Card>

          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp"
                height="150"
                alt="imagen"
              />
              <CardContent>
                <Typography variant="h5" mt={1}>
                  Casa de Ensueño
                </Typography>
                <Typography component="p" variant="body2" mt={1}>
                  La casa de ensueño cuenta con 5 habitaciones, 5 y 1/2 baños, pileta y un gran
                  patio. Veni por la llave de la casa de tus sueños
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained">Hacer Reserva</Button>
              <Button variant="outlined">Mas Informacion</Button>
            </CardActions>
          </Card>

          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp"
                height="150"
                alt="imagen"
              />
              <CardContent>
                <Typography variant="h5" mt={1}>
                  Casa de Ensueño
                </Typography>
                <Typography component="p" variant="body2" mt={1}>
                  La casa de ensueño cuenta con 5 habitaciones, 5 y 1/2 baños, pileta y un gran
                  patio. Veni por la llave de la casa de tus sueños
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained">Hacer Reserva</Button>
              <Button variant="outlined">Mas Informacion</Button>
            </CardActions>
          </Card>

          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp"
                height="150"
                alt="imagen"
              />
              <CardContent>
                <Typography variant="h5" mt={1}>
                  Casa de Ensueño
                </Typography>
                <Typography component="p" variant="body2" mt={1}>
                  La casa de ensueño cuenta con 5 habitaciones, 5 y 1/2 baños, pileta y un gran
                  patio. Veni por la llave de la casa de tus sueños
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained">Hacer Reserva</Button>
              <Button variant="outlined">Mas Informacion</Button>
            </CardActions>
          </Card>

          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp"
                height="150"
                alt="imagen"
              />
              <CardContent>
                <Typography variant="h5" mt={1}>
                  Casa de Ensueño
                </Typography>
                <Typography component="p" variant="body2" mt={1}>
                  La casa de ensueño cuenta con 5 habitaciones, 5 y 1/2 baños, pileta y un gran
                  patio. Veni por la llave de la casa de tus sueños
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained">Hacer Reserva</Button>
              <Button variant="outlined">Mas Informacion</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </div>
  );
};
//
