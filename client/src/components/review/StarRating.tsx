import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
export const StarRating = () => {
  const [value, setValue] = React.useState<number>(2); // en cero a la hora de funcionar
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        readOnly // para que se vean las estrellas fijas
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue as number);
        }}
      />
    </Box>
  );
};
