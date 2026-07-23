/** Head + upper body only — the lower body is meant to stay hidden behind shell-bottom. */
export function Chick() {
  return (
    <>
      <ellipse cx="30" cy="50" rx="12" ry="15" fill="var(--egg-yolk-light)" />
      <circle cx="30" cy="28" r="10" fill="var(--egg-yolk-light)" />
      <circle cx="26" cy="26" r="2" fill="var(--foreground)" />
      <circle cx="34" cy="26" r="2" fill="var(--foreground)" />
      <polygon points="27,31 33,31 30,36" fill="var(--chart-4)" />
    </>
  );
}
