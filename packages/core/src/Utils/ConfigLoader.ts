import path from "path";
import * as fs from "fs";
import * as yml from "js-yaml";

export class ConfigLoader {

    private static config: Record<string,any>

    public static load(directory?: string){
        const filePath = directory || 'application.yml';
        const absolutPath = path.resolve(process.cwd(), filePath);
        try{
            const file = fs.readFileSync(absolutPath, 'utf8');
            this.config = yml.load(file) as Record<string,any>;
        }catch(error){
            console.error(error);
            this.config = {}
        }
    }

    public static get<T = any>(key: string, defaultValue?: T): T {
        const value = key.split('.').reduce((o, i) => (o ? o[i] : undefined), this.config);
        return (value !== undefined ? value : defaultValue) as T;
  }
}