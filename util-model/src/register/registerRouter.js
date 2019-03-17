import express from 'express';
import { RegisterAction } from './RegisterAction'

const router = express.Router();
const registerAction = RegisterAction.instance;

router.post('/service', (req, res) => {
    let name = req.body.name;
    let hostname = req.body.hostname;
    registerAction.postService(name, hostname);
    res.send();
});

router.get('/services', (req, res) => {
    registerAction.filterService();
    let services = registerAction.getServices();
    res.send(services);
});

module.exports = router;