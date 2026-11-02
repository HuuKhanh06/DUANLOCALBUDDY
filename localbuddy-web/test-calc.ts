// test-calc.ts
import { calcPenaltyRate, calcPenaltyAmount, calcRefundAmount, calcBookingAmounts } from './src/features/payment/calc';

let pass = 0;
let fail = 0;

function assert(desc: string, actual: any, expected: any) {
  if (actual === expected) {
    console.log(`✓ PASS: ${desc}`);
    pass++;
  } else {
    console.error(`✗ FAIL: ${desc} (Got: ${actual}, Expected: ${expected})`);
    fail++;
  }
}

console.log('--- TEST BẢNG PHẠT THEO ΔT ---');
assert('ΔT = 49h -> 0%', calcPenaltyRate(49), 0);
assert('ΔT = 48h -> 50%', calcPenaltyRate(48), 0.5);
assert('ΔT = 24h -> 50%', calcPenaltyRate(24), 0.5);
assert('ΔT = 23h -> 100%', calcPenaltyRate(23), 1);
assert('ΔT = 0h  -> 100%', calcPenaltyRate(0), 1);

console.log('\n--- TEST TÍNH TIỀN G = 600.000 đ (BK-1007) ---');
const amounts = calcBookingAmounts(200000, 3, 0.12);
assert('G = 600.000', amounts.total, 600000);
assert('D = 30% G = 180.000', amounts.deposit, 180000);
assert('B = 70% G = 420.000', amounts.remaining, 420000);
assert('Phí sàn 12% = 72.000', amounts.platformFee, 72000);
assert('Guide nhận = 528.000', amounts.guideReceives, 528000);

console.log('\n--- TEST HOÀN/PHẠT BK-1007 (ΔT 30h) ---');
assert('Phạt BK-1007 = 90.000', calcPenaltyAmount(180000, 30), 90000);
assert('Hoàn BK-1007 = 90.000', calcRefundAmount(180000, 30), 90000);

console.log(`\nKết quả: ${pass} passed, ${fail} failed.`);
if (fail > 0) process.exit(1);

