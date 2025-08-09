import path from "path";
const fs = require('fs-extra');

export async function createApp(appName: string) {

    const templatePath = path.resolve(__dirname, "../../src/templates/basic");

    const targetPath = path.resolve(process.cwd(), appName);

    console.log("Looking for template at:", templatePath);
    console.log("Files in template path:", fs.readdirSync(templatePath));

    if (!fs.existsSync(templatePath)) {
      console.error('❌ Template not found in CLI!');
      process.exit(1);
    }

    if (fs.existsSync(targetPath)) {
      console.error(`❌ Folder '${appName}' already exists in this directory.`);
      process.exit(1);
    }

    try {
      await fs.copy(templatePath, targetPath);
      console.log(`✅ Nova app '${appName}' created successfully!`);
      console.log(`👉 cd ${appName} && npm install`);
    } catch (err: any) {
      console.error('❌ Failed to create app:', err.message);
      process.exit(1);
    }

}