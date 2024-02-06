const {logger} = require('utils');

class YmlWebPage {
    constructor(dirName) {
        if (YmlWebPage._instance) {
            return YmlWebPage._instance;
        }
        YmlWebPage._instance = this;
        this.dirName = dirName;
        this.logger = logger;
    }

    //1. read the yml -> update -> html
    //2. write the yml -> html
    //3. update the webStaticSite

    async createWebYmlConfig() {
        let ymlConfigFile = 
    }

    async readWebYmlConfig() {

    }

    async writeIndesHtml() {

    }
}
module.exports = YmlWebPage;