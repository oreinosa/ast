export interface Chat {
  phone: string;
  reason: string;
  identification: string;
  reasoning: string;
  featureIdea: string;
  secondary: string;
  resolution: string;
  followupDate: string;
  status: string;
}

export class Chat {
  constructor(
    public phone: string = "",
    public reason: string = "",
    public identification: string = "",
    public reasoning: string = "",
    public featureIdea: string = "",
    public secondary: string = "",
    public resolution: string = "",
    public followupDate: string = "",
    public status: string = "",
  ) {
    // this.phone = "123123123";
    // this.reason = "Customer was reporting none of his users could receive emails";
    // this.identification = "The customer's domain is missing MX records since it's a new account";
    // this.reasoning = "We went through the MX records setup";
    // this.secondary = "-Advised MX records aren't pointing to Google \n -Guided through DNS host on adding G Suite MX records \n -Advised 24-72 hours propagation time";
    // this.resolution = "Assisted customer on configuring G Suite MX records";
    // this.status = "Closed";
  }
}
