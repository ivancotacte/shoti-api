import express from 'express';
import { addVideo } from '../controllers/addVideo.js';
import { getVideo } from '../controllers/getVideo.js';
const router = express.Router();

router.post('/add', addVideo);
router.post('/get', getVideo);

export { router };