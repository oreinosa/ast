export interface User {
  id?: number;
  name?: string;
  email?: string;
  specialization?: string;
  channel?: string;
  language?: string;
  lob?: string;
  workdayID?: string;
  supervisorName?: string;
  ldap?: string;
  roster?: string;
}
export class User {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public specialization?: string,
    public channel?: string,
    public language?: string,
    public lob?: string,
    public workdayID?: string,
    public supervisorName?: string,
    public ldap?: string,
    public roster?: string
  ) { }
}
