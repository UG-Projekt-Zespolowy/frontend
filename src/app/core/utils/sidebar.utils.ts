export const SIDEBAR_WIDTH = {
  COLLAPSED: "w-16",
  EXPANDED: "w-1/5",
} as const;

export const SIDEBAR_PADDING = {
  COLLAPSED: "pl-20",
  EXPANDED: "pl-[calc(20%+1.5rem)]",
} as const;

export function getSidebarPadding(isCollapsed: boolean): string {
  return isCollapsed ? SIDEBAR_PADDING.COLLAPSED : SIDEBAR_PADDING.EXPANDED;
}
