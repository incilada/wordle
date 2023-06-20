export class RandomHelper {
  public static generateText(length: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ';
    let output = '';
    for (let i = 0; i < length; i++) {
      const randomNum = Math.floor(Math.random() * chars.length);
      output += chars.substring(randomNum, randomNum + 1);
    }
    return output;
  }
}
