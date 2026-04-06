/** Crédit à mensualités constantes, intérêts composés mensuels */

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balanceAfter: number;
}

export function computeMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  months: number
): number {
  if (months <= 0 || principal <= 0) return 0;
  const r = annualRatePercent / 12 / 100;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

/**
 * Tableau d’amortissement (mensualité constante ; dernier mois ajusté pour solder le capital).
 */
export function buildAmortizationSchedule(
  principal: number,
  annualRatePercent: number,
  months: number
): AmortizationRow[] {
  const rows: AmortizationRow[] = [];
  if (months <= 0 || principal <= 0) return rows;

  const monthlyRate = annualRatePercent / 12 / 100;
  const payment = computeMonthlyPayment(principal, annualRatePercent, months);
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    let principalPayment = payment - interest;

    if (month === months || principalPayment > balance) {
      principalPayment = balance;
    }

    const newBalance = Math.max(0, balance - principalPayment);
    const linePayment = principalPayment + interest;

    rows.push({
      month,
      payment: linePayment,
      principal: principalPayment,
      interest,
      balanceAfter: newBalance,
    });

    balance = newBalance;
  }

  return rows;
}

export function totalInterest(schedule: AmortizationRow[]): number {
  return schedule.reduce((s, r) => s + r.interest, 0);
}
