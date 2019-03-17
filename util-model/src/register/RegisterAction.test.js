import { RegisterAction } from './RegisterAction'

const registerAction = RegisterAction.instance;


test('getServices', () => {
    registerAction.postService("name", "hostname");
    registerAction.postService("name", "hostname1");
    registerAction.filterService(-1);
    registerAction.postService("name", "hostname3");
    registerAction.postService("name1", "hostname3");
    console.log(registerAction.getServices())
    
})