import electron from 'electron';
import path from 'path';
import fs from 'fs';

class Setting {
    constructor() {
        const dataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(dataPath, 'config.json');
        this.config = this.parseConfig(this.path);
    }

    get(key) {
        return this.config[key];
    }

    set(key, value) {
        this.config[key] = value;
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            try {
                fs.writeFileSync(this.path, JSON.stringify(this.config));
            } catch (e) {
            }
        }, 500);
    }

    parseConfig(file) {
        if (!fs.existsSync(file)) {
            return {};
        }

        try {
            return JSON.parse(fs.readFileSync(file));
        } catch (e) {
            return {};
        }
    }
}

export default Setting;
