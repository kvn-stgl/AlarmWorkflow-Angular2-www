export class CalendarEntry {
  Start: Date;
  End: Date;

  constructor(
    public Duration: string, 
    public Summary: string,
    public Location: string,
    Start: string, End: String) {
        this.Start = new Date(this.Start);
        this.End = new Date(this.End)

        console.log(this);
  }
}
