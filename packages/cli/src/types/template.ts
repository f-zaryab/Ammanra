export type TemplateType = "primitive" | "layout" | "shared";

export type TemplateFile = {
  source: string;
  target: string;
};

export type TemplateManifest = {
  name: string;
  type: TemplateType;
  dependencies: string[];
  internalDependencies: string[];
  files: TemplateFile[];
};
