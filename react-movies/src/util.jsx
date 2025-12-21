// util.jsx

// Part 3 — Convert minutes (e.g., 130) -> "2 h 10 m"
export const formatRuntime = (mins) => {
  if (mins === undefined || mins === null) return "";
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours} h ${minutes} m`;
};

// Part 3 — Return a short preview of long text (used by MovieReviews)
export const excerpt = (text, maxLen = 400) => {
  if (!text || typeof text !== "string") return "";
  if (text.length <= maxLen) return text;
  return text.substring(0, maxLen).trimEnd() + "…";
};
