// import { Router } from "express";
// import { sequelize } from "../../db";

// const router = Router();
// const { Message } = sequelize.models;

// export const postMessage = async (req: Request, res: Response) => {
//   try {
//     const { mensaje } = req.body;
//     const timestamp = Date.now();
//     const nuevoMensaje = await Message.create({ mensaje, timestamp });
//     res.json({ mensaje: nuevoMensaje });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };

// export default router;
