
export default class PsiPressure {
  private readonly lowPressureThreshold = 17;
  private readonly highPressureThreshold = 21;

  public isOutOfRange(pressure: number): boolean {
    return pressure < this.lowPressureThreshold || pressure > this.highPressureThreshold;
  }
}
