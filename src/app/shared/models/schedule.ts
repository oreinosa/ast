export interface Schedule {
  name?: string;
  schedule?: string[][];
}

export class Schedule {
  constructor(
    public name?: string,
    public schedule?: string[][]
  ){}
}
