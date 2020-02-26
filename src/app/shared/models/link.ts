export class Link {
  constructor(
    public route?: string,
    public label?: string,
    public icon?: string,
    public children?: Link[],
    public showChildren?: boolean
  ) { }
}
