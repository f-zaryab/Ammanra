#!/usr/bin/env node

import { Command } from "commander";
import { addCommand } from "./commands/add";

const program = new Command();

program
  .name("ammanra")
  .description("CLI to install Ammanra UI components")
  .version("1.0.0");

program
  .command("add")
  .argument("<component>", "component name")
  .action(addCommand);

program.parse();
