import {Response, Request, Router} from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
 res.send('soy la ruta get!');
});

router.post('/', (req: Request, res: Response) => {
 res.send('soy la ruta posssst!');
});
// ununuhjh
export default router;