import fs from "fs-extra";
import path from "node:path";
import type { ResolvedTemplate } from "./resolve-templates";

const writeTemplateFiles = async (
  templates: Map<string, ResolvedTemplate>,
  cwd: string,
) => {
  for (const [, template] of templates) {
    const { manifest, templateDir } = template;

    for (const file of manifest.files) {
      const sourcePath = path.join(templateDir, file.source);
      const targetPath = path.join(cwd, file.target);

      const targetDir = path.dirname(targetPath);

      await fs.ensureDir(targetDir);
      await fs.copyFile(sourcePath, targetPath);

      console.log(`Created: ${file.target}`);
    }
  }
};

export default writeTemplateFiles;
