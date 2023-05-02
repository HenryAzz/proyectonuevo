import { sequelize } from "./src/db";
import app from "./src/app";
sequelize
  .sync({ force: true, logging: false })
  .then(() => {
  
    console.log("base de datos conectada! :D");
    app.listen(3000, function () {
      console.log("App is listening on port 3000!");
    });
  })
  .catch((err) => console.error("este es el error" + err));
