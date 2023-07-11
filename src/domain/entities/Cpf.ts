export default class Cpf {
  private value: string
  private MIN_DIGITS_CPF = 11;

  constructor(readonly cpf: string) {
    this.cpf = this.CleanCpf();
    if (this.isValidLength()) throw new Error("Invalid cpf length");
    if (this.ValidateAllDigitsAreTheSame()) throw new Error("Invalid cpf!");
    if (!this.isValid()) throw new Error("This document is invalid!");
    this.value = this.cpf;
  }

  private CleanCpf() {
    return this.cpf.replace(/\D/g, '');
  } 

  private isValidLength() {
    return this.cpf.length !== this.MIN_DIGITS_CPF;
  }

  private ValidateAllDigitsAreTheSame() {
    const [firstDigit] = this.cpf;
    return [...this.cpf].every(digit => digit === firstDigit)
  }

  isValid() {
    const firstDigit = this.CalculateDigits(10);
    const secondDigit = this.CalculateDigits(11);
    let checkingLastDigits = this.cpf.slice(9);  
    let lastDigitsCpf = `${firstDigit}${secondDigit}`;  
    return checkingLastDigits === lastDigitsCpf;
  }

  private CalculateDigits(factor: number) {
    let total = 0;
    for (const digit of this.cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % this.MIN_DIGITS_CPF;
    return rest < 2 ? 0 : this.MIN_DIGITS_CPF - rest;
  }

  getCpf() {
    return this.value;
  }
}