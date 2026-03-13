import fs from "fs-extra";
import path from "node:path";

// TODO: Check for react or nextjs app only

const getProjectRoot = async (cwd = process.cwd()) => {
  const packageJsonPath = path.join(cwd, "package.json");

  if (!(await fs.pathExists(packageJsonPath))) {
    throw new Error(
      "No package.json found. Run this command inside the project.",
    );
  }

  return cwd;
};

export default getProjectRoot;
