import {Router} from 'express';

export const router = Router();

/* GET services listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
