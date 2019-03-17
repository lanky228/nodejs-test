import { ServiceAction } from './../service/ServiceAction'

export class RegisterAction {
    postService(name, hostname, port) {
        console.log(`postService: ${name} ${hostname} ${port}`);
        if (port) {
            hostname += ':' + port;
        }
        let map = ServiceAction.serviceHostMap;
        let timeMap = ServiceAction.serviceTimeMap;
        let list = map[name];
        if(!list){
            list = [];
        }
        if(!list.includes(hostname)){
            list.push(hostname);
        }
        map[name] = list;
        timeMap[hostname] = new Date().getTime();
    }
    getServices(){
        return ServiceAction.serviceHostMap;
    }
    filterService(timeOut){
        if(!timeOut){
            timeOut = 30 * 1000;
        }
        let map = ServiceAction.serviceHostMap;
        for(let key in map){
            let list = map[key];
            let currentTime = new Date().getTime();
            let tempList = list.filter((value) => {
                let timeMap = ServiceAction.serviceTimeMap;
                let time = timeMap[value];
                if(currentTime - time > timeOut){
                    return false;
                }
                return true;
            });
            map[key] = tempList;
        }
    }
}

RegisterAction.instance = new RegisterAction();
