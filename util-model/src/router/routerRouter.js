import express from 'express';
import httpProxy from 'http-proxy';
import { ServiceAction } from './../service/ServiceAction'

const router = express.Router();
const serviceAction = ServiceAction.instance;

router.all(/^\/(.+?)\/(.*)/, (req, res) => {
    let name = req.params[0];
    let path = req.params[1];
    console.log(`routerRouter: name(${name}) path(${path})`);
    let host = serviceAction.getServiceHost(name);
    if(!host){
        const message = `routerRouter: name(${name}) path(${path}), host not exit, fail!`
        console.log(message);
        res.send(message);
        return;
    }
    let proxy = httpProxy.createProxyServer({
        ignorePath: true
    });
    let target = `http://${host}/${path}`;
    console.log(`routerRouter1: target(${target})`);
    proxy.web(req, res, {
        target
    });
});

module.exports = router;