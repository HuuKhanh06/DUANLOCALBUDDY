// utils/time.ts – Định dạng thời gian

/**
 * Định dạng ngày: "2026-11-02" → "02/11/2026"
 */
export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

/**
 * Định dạng khoảng giờ: "09:00", "12:00" → "09:00 – 12:00"
 */
export function formatTimeRange(start: string, end: string): string {
  return `${start} – ${end}`;
}

/**
 * Tính ΔT (giờ) từ thời điểm hiện tại đến giờ bắt đầu ca
 * Trả về số giờ dương nếu chưa đến, âm nếu đã qua
 */
export function calcDeltaHours(date: string, startTime: string): number {
  const now = Date.now();
  const startMs = new Date(`${date}T${startTime}:00`).getTime();
  return (startMs - now) / (1000 * 60 * 60);
}

/**
 * Kiểm tra giờ bắt đầu có cách hiện tại ≥ 24 giờ không
 */
export function isAtLeast24HoursAway(date: string, startTime: string): boolean {
  return calcDeltaHours(date, startTime) >= 24;
}

