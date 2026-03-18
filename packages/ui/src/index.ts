export * from "./components/Button";
export * from "./components/Card";
export * from "./components/ColorSwatch";
export * from "./components/EmptyState";
export * from "./components/HeroPanel";
export * from "./components/InputField";
export * from "./components/SectionHeader";
export * from "./components/StatCard";
export * from "./components/StatusBadge";
export * from "./design/tokens";
export { brandAssets } from "./assets";

export const MONOREPO_ID = "dcompass-platform";

export function combineClassNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}
