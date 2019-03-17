import * as bodyParser from 'body-parser';
import express from 'express';

import indexRouter from 'util-model/src/index/indexRouter'
import registerRouter from 'util-model/src/register/registerRouter'
import routerRouter from 'util-model/src/router/routerRouter'
import { RegisterAction } from 'util-model/src/register/RegisterAction';
import { UtilAction } from 'util-model/src/util/UtilAction';

const expressInstance = express();
const registerAction = RegisterAction.instance;
const utilAction = UtilAction.instance;

export class App {
    run(host, port) {
        this.router();
        utilAction.printRouter(expressInstance);
        this.listen();
        this.registerMyself();
        this.serviceTimeOut();
    }
    registerMyself() {
        let registerTime = this.registerTime;
        let serviceName = this.serviceName;
        let hostname = this.hostname;
        let port = this.port;
        registerAction.postService(serviceName, hostname, port);
        setInterval(registerAction.postService, registerTime, serviceName, hostname, port);
    }
    serviceTimeOut(){
        let registerTime = this.registerTime;
        let filterTime = registerTime * 2;
        setInterval(registerAction.filterService, filterTime);
    }
    router() {
        expressInstance.use(bodyParser.urlencoded({ extended: false }));
        expressInstance.use(bodyParser.json());
        expressInstance.use(indexRouter);
        expressInstance.use('/register', registerRouter);
        expressInstance.use('/router', routerRouter);
    }
    listen() {
        var self = this;
        let service = expressInstance.listen(this.port, this.hostname, () => {
            let address = service.address();
            self.hostname = address.address;
            self.port = address.port;
            console.log("server running http://%s:%s", address.address, address.port)
        });
    }
}

App.instance = new App();
const app = App.instance;
app.serviceName = 'registerService';
app.hostname = 'localhost';
app.port = 8080;
app.registerTime = 30 * 1000;
App.instance.run();