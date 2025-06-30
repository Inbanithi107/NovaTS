import path from "path";
import * as fs from "fs";
import * as yml from "js-yaml";

/**
 * Responsible for loading application configuration from YAML (.yml)
 * or other property sources during app startup.
 */
export class ConfigLoader {

    private static config: Record<string,any>

    /**
   * Loads the configuration file (default: `application.yml`) from the specified directory
   * and caches it statically.
   *
   * @param directory - Optional directory path where the config file is located.
   *                    Defaults to current working directory.
   * @throws Will throw an error if no config file is found.
   */
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

    /**
   * Gets a nested value from the config using dot notation (e.g., "server.port").
   *
   * @param path - Dot-notated path to a specific configuration key.
   * @returns The resolved value or `undefined` if not found.
   */
    public static get<T = any>(key: string, defaultValue?: T): T {
        const value = key.split('.').reduce((o, i) => (o ? o[i] : undefined), this.config);
        return (value !== undefined ? value : defaultValue) as T;
  }
}