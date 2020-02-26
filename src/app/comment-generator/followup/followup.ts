
export interface Followup {
  method: string;
  discussed: string;
  next: string;
  featureIdea: string;
  followupDate: string;
  status: string;
}
export class Followup {
  constructor(
    public method: string = "",
    public discussed: string = "",
    public next: string = "",
    public featureIdea: string = "",
    public followupDate: string = "",
    public status: string = "",
  ) {
    // this.method = "Phone";
    // this.discussed = "-Customer's still having the issue \n -Guided on exporting HAR file \n -Advised we'll check this on our side";
    // this.next = "-Check HAR file and submit consult if necessary";
    // this.status = "IPGS";
  }
}