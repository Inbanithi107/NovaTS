// autoBind.ts
import fg from "fast-glob";
import path from "path";
import { pathToFileURL } from "url";


let bootstrapped = false;

/**
 * 
 * @param baseDir The Classpath to be scanned
 * @author Inbanithi
 * @description It scans the files inside the ClassPath to load configuration to ApplicationContext
 */
export async function autoBind(baseDir: string) {
  if (bootstrapped) return;
  bootstrapped = true;

  const files = await fg(`${baseDir}/**/*.js`);
  console.log("Auto-binding files:", files);

  for (const file of files) {
    const fullPath = path.resolve(file)
    const fileUrl = pathToFileURL(fullPath).href;
    await import(fileUrl);
  }
}
