export interface HashComparer {
  compare(hash: string, otherHash: string): Promise<boolean>
}