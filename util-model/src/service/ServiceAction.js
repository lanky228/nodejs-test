export class ServiceAction {
    getServiceHost(name) {
        const hosts = ServiceAction.serviceHostMap[name];
        if(!hosts){
            return '';
        }
        const size = hosts.length;
        if(size == 1){
            return hosts[0];
        }
        return hosts[parseInt(Math.random() * size)]; 
    }
}

ServiceAction.instance = new ServiceAction();
ServiceAction.serviceHostMap = {};
ServiceAction.serviceTimeMap = {};