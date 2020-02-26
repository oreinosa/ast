export interface Communication {
  id?: string;
  subject?: string;
  priority?: number;
  type?: string; 
  required?: string;
  ack?: string;
  image?: string;
  link?: string;
  timestamp?: string;
  imageLink?: string;
}
export class Communication {
  constructor(
    public id?: string,
    public subject?: string,
    public priority?: number,
    public type?: string, 
    public required?: string,
    public ack?: string,
    public image?: string,
    public link?: string,
    public timestamp?: string,
    public imageLink?: string,
  ){}
}