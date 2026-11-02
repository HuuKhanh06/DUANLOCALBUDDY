// features/payment/calc.ts – Tính tiền và phạt hủy đơn

/**
 * Mức phạt theo ΔT (giờ còn lại đến giờ bắt đầu)
 * ΔT > 48h  → phạt 0%
 * 24 ≤ ΔT ≤ 48h → phạt 50%
 * ΔT < 24h  → phạt 100%
 */
export function calcPenaltyRate(deltaHours: number): number {
  if (deltaHours > 48) return 0;
  if (deltaHours >= 24) return 0.5;
  return 1;
}

/**
 * Tính số tiền phạt (trên tiền cọc)
 */
export function calcPenaltyAmount(deposit: number, deltaHours: number): number {
  return Math.round(deposit * calcPenaltyRate(deltaHours));
}

/**
 * Tính số tiền hoàn lại cho Tourist
 */
export function calcRefundAmount(deposit: number, deltaHours: number): number {
  return deposit - calcPenaltyAmount(deposit, deltaHours);
}

/**
 * Tính đầy đủ: G, D, B, phí, Guide nhận
 */
export function calcBookingAmounts(
  hourlyRate: number,
  hours: number,
  feeRate: number
): {
  total: number;
  deposit: number;
  remaining: number;
  platformFee: number;
  guideReceives: number;
} {
  const total = hourlyRate * hours;
  const deposit = Math.round(total * 0.3);
  const remaining = total - deposit;
  const platformFee = Math.round(total * feeRate);
  const guideReceives = total - platformFee;
  return { total, deposit, remaining, platformFee, guideReceives };
}
