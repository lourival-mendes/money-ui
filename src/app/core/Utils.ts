export abstract class Utils{

  static formatNumber(valor: number): string{
    return Intl.NumberFormat('pt-br', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(valor);
  }

  static formatCurrency(valor: number): string{
    return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(valor);
  }

}
