import { json } from "../../../jsonejemplo";
import { sequelize } from "../../db";

const {Property} = sequelize.models


// HELPER GET //
export const findProps = async function () {
    const db = await Property.findAll();
    if (db.length < 1) {
        const props = json.map(async(prop)=> {
            
            await Property.create(prop)})

            return json
    }
    return db
}

////////