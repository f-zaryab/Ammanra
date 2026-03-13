import { loadManifest } from "./load-manifest";
import type { TemplateManifest } from "../types/template";

export type ResolvedTemplate = {
  manifest: TemplateManifest;
  templateDir: string;
};

const resolveTemplates = async (
  name: string,
  resolved = new Map<string, ResolvedTemplate>(),
  seen = new Set<string>(),
): Promise<Map<string, ResolvedTemplate>> => {
  // To avoid circular dependency
  if (seen.has(name)) {
    throw new Error(`Circular dependency detected for template "${name}".`);
  }

  // To avoid already installed dependency
  if (resolved.has(name)) {
    return resolved;
  }

  seen.add(name);

  // Debugging
  //   console.log("Name: ", name);
  //   console.log("Resolved: ", resolved);
  //   console.log("Seen: ", seen);

  const template = await loadManifest(name);

  for (const dependency of template.manifest.internalDependencies) {
    await resolveTemplates(dependency, resolved, seen);
  }

  seen.delete(name);
  resolved.set(name, template);

  // console.log("ResolvedEnd: ", resolved);

  return resolved;
};

export default resolveTemplates;
