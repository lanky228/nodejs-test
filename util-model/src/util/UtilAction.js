export class UtilAction {
    printRouter(expressInstance) {
        if (!expressInstance._router.stack) {
            return;
        }
        for (let item of expressInstance._router.stack) {
            if (!item.handle.stack) {
                continue;
            }
            console.log(item.regexp);
            for (let subItem of item.handle.stack) {
                console.log("\t" + subItem.regexp);
            }
        }
    }
}

UtilAction.instance = new UtilAction();
