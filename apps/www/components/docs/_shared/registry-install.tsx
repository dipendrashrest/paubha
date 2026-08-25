import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { InstallTabs } from "./install-tabs";

type RegistryManifest = {
  items: Array<{
    name: string;
    files: Array<{ path: string }>;
  }>;
};

function resolveRegistryRoot() {
  const candidates = [
    join(process.cwd(), "../../packages/registry"),
    join(process.cwd(), "packages/registry"),
  ];
  const match = candidates.find((dir) =>
    existsSync(join(dir, "registry.json")),
  );
  if (!match) {
    throw new Error(
      `Could not find packages/registry. Tried:\n${candidates.join("\n")}`,
    );
  }
  return match;
}

function readManifest(root: string): RegistryManifest {
  return JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
}

/** Install tabs for a registry item — files come from registry.json. */
export function RegistryInstall({ name }: { name: string }) {
  const root = resolveRegistryRoot();
  const item = readManifest(root).items.find((entry) => entry.name === name);
  if (!item) {
    throw new Error(`Unknown registry item "${name}"`);
  }

  const manual = item.files
    .map((file) => {
      const source = readFileSync(join(root, file.path), "utf8");
      return `// ${file.path}\n${source.trimEnd()}`;
    })
    .join("\n\n");

  return <InstallTabs name={name} manual={manual} />;
}

export function AvatarInstall() {
  return <RegistryInstall name="avatar" />;
}

export function SelectInstall() {
  return <RegistryInstall name="select" />;
}

export function ToastInstall() {
  return <RegistryInstall name="toast" />;
}

export function PaginationInstall() {
  return <RegistryInstall name="pagination" />;
}

export function PopoverInstall() {
  return <RegistryInstall name="popover" />;
}

export function ButtonInstall() {
  return <RegistryInstall name="button" />;
}

export function BadgeInstall() {
  return <RegistryInstall name="badge" />;
}

export function InputInstall() {
  return <RegistryInstall name="input" />;
}

export function FieldInstall() {
  return <RegistryInstall name="field" />;
}

export function TextareaInstall() {
  return <RegistryInstall name="textarea" />;
}

export function CheckboxInstall() {
  return <RegistryInstall name="checkbox" />;
}

export function RadioGroupInstall() {
  return <RegistryInstall name="radio-group" />;
}

export function SwitchInstall() {
  return <RegistryInstall name="switch" />;
}

export function AlertInstall() {
  return <RegistryInstall name="alert" />;
}

export function SpinnerInstall() {
  return <RegistryInstall name="spinner" />;
}

export function DividerInstall() {
  return <RegistryInstall name="divider" />;
}

export function SkeletonInstall() {
  return <RegistryInstall name="skeleton" />;
}

export function ProgressBarInstall() {
  return <RegistryInstall name="progress-bar" />;
}

export function BreadcrumbsInstall() {
  return <RegistryInstall name="breadcrumbs" />;
}

export function TooltipInstall() {
  return <RegistryInstall name="tooltip" />;
}

export function DropdownMenuInstall() {
  return <RegistryInstall name="dropdown-menu" />;
}

export function ModalInstall() {
  return <RegistryInstall name="modal" />;
}

export function TabsInstall() {
  return <RegistryInstall name="tabs" />;
}
