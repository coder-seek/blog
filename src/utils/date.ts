/** Format a Date to YYYY-MM-DD */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Format a Date to Chinese full date like "2026年7月21日" */
export function formatDateCN(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

/** Estimate reading time for Chinese/English mixed content */
export function readingTime(text: string): number {
  const cleaned = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
  const chineseChars = (cleaned.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishWords = cleaned
    .replace(/[\u4e00-\u9fff]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(chineseChars / 400 + englishWords / 200));
}
