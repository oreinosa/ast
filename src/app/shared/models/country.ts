export interface Country{
  name?: string;
  alpha2Code?: string;
  flag?: string;
}
export class Country {
  constructor(
    public name?: string,
    public alpha2Code?: string,
    public flag?: string,
  ){}
}
