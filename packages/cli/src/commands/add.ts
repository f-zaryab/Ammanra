import getProjectRoot from "../utils/get-project-root.js";
import resolveTemplates from "../utils/resolve-templates.js";
import writeTemplateFiles from "../utils/write-template-files.js";

export async function addCommand(component: string) {
  try {
    const cwd = await getProjectRoot();
    const resolved = await resolveTemplates(component);

    console.log("Installing templates:\n");

    for (const [name] of resolved) {
      console.log(`- ${name}`);
    }

    console.log("");

    await writeTemplateFiles(resolved, cwd);

    console.log("\nInstall complete.");

    // for (const [name, { manifest, templateDir }] of resolved) {
    //   console.log(`Template: ${name}`);
    //   console.log(`- type: ${manifest.type}`);
    //   console.log(`- directory: ${templateDir}`);
    //   console.log(
    //     `- npm dependencies: ${manifest.dependencies.join(", ") || "none"}`,
    //   );
    //   console.log(
    //     `- internal dependencies: ${
    //       manifest.internalDependencies.join(", ") || "none"
    //     }`,
    //   );
    //   console.log("- files:");
    //   for (const file of manifest.files) {
    //     console.log(`  • ${file.source} -> ${file.target}`);
    //   }
    //   console.log("");
    // }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    }

    console.error("Something went wrong.");
    process.exit(1);
  }
}
