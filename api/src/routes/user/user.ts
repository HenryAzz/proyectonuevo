import { Response, Request, Router } from "express";
const router = Router();

interface error {
  status: number;
  message: string;
}

const getUsers = async (err: error, req: Request, res: Response) => {
  const message = err.message;
  try {
    const user = await res.send("soy la ruta get!");
  } catch (err) {
    res.send(message);
  }
};

router.get("/", getUsers);

router.post("/", (req: Request, res: Response) => {
  res.send("soy la ruta post!");
});

export default router;
