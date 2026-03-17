export * from "./components/HeroPanel";
export * from "./components/StatusBadge";

export const MONOREPO_ID = "dcompass-platform";

export function combineClassNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}
