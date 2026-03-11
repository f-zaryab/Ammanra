import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { TemplateManifest } from "../types/template";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesRoot = path.resolve(__dirname, "../templates");
const templateGroups = ["primitive", "layout", "shared"] as const;

export async function loadManifest(
  name: string,
): Promise<{ manifest: TemplateManifest; templateDir: string }> {
  for (const group of templateGroups) {
    const dir = path.join(templatesRoot, group, name);
    const manifestPath = path.join(dir, "meta.json");

    if (await fs.pathExists(manifestPath)) {
      const manifest = (await fs.readJson(manifestPath)) as TemplateManifest;

      return {
        manifest,
        templateDir: dir,
      };
    }
  }

  throw new Error(`Template "${name}" not found.`);
}
