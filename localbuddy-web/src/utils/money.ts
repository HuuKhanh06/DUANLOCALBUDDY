// utils/money.ts – Định dạng và tính tiền

/**
 * Định dạng tiền VND: 1250000 → "1.250.000 đ"
 */
export function formatMoney(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' đ';
}

/**
 * Tính tổng tiền G = giá giờ × số giờ
 */
export function calcTotal(hourlyRate: number, hours: number): number {
  return hourlyRate * hours;
}

/**
 * Tính tiền cọc D = 30% G (làm tròn đồng)
 */
export function calcDeposit(total: number): number {
  return Math.round(total * 0.3);
}

/**
 * Tính tiền còn lại B = 70% G (làm tròn đồng)
 */
export function calcRemaining(total: number): number {
  return Math.round(total * 0.7);
}

/**
 * Tính phí sàn = G × feeRate
 */
export function calcPlatformFee(total: number, feeRate: number): number {
  return Math.round(total * feeRate);
}

/**
 * Tính tiền Guide nhận (Online) = G − phí sàn
 */
export function calcGuideReceives(total: number, feeRate: number): number {
  return total - calcPlatformFee(total, feeRate);
}

