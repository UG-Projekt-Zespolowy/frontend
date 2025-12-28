export function getUserInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getDisplayName(name?: string | null, email?: string | null): string {
  return name || email || "User";
}
