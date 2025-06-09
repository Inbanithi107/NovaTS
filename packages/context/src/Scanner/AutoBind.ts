// autoBind.ts
import fg from "fast-glob";
import path from "path";
import { pathToFileURL } from "url";


let bootstrapped = false;

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
