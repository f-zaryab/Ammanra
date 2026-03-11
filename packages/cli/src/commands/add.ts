import { loadManifest } from "../utils/load-manifest.js";

export async function addCommand(component: string) {
  try {
    const { manifest, templateDir } = await loadManifest(component);

    console.log("Template found:");
    console.log(`- name: ${manifest.name}`);
    console.log(`- type: ${manifest.type}`);
    console.log(`- directory: ${templateDir}`);
    console.log(
      `- npm dependencies: ${manifest.dependencies.join(", ") || "none"}`,
    );
    console.log(
      `- internal dependencies: ${manifest.internalDependencies.join(", ") || "none"}`,
    );
    console.log("- files:");
    for (const file of manifest.files) {
      console.log(`  • ${file.source} -> ${file.target}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    }

    console.error("Something went wrong.");
    process.exit(1);
  }
}
