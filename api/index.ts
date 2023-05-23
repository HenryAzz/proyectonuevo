import { sequelize } from "./src/db";
import app from "./src/app";
import { countBroker } from "./jsonBrokerCorreo";
import { fillDataBase } from "./src/routes/property/pHelper";

const { Broker } = sequelize.models;

sequelize
  .sync({ force: false, logging: false })
  .then(async () => {
    console.log("base de datos conectada! :D");
    //cargar unos usuarios de broker para prueba
    // await Broker.bulkCreate(countBroker);
    app.listen(3001, function () {
      fillDataBase();
      console.log("App is listening on port 3001!");
    });
  })
  .catch((err) => console.error(err));
