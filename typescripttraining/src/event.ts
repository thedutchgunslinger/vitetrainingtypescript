import axios from "axios";
import { events, showSnackbar, snackbarTypes } from "./utilities";

/**
 * @class event represents an event
 *
 */
export default class event {
  type: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  url: string;
  id: number;

  /**
   *
   * @param type the type of event
   * @param title the title of the event
   * @param description  the description of the event
   * @param date the date of the event
   * @param startTime the start time of the event
   * @param endTime the end time of the event
   * @param location (optional) the location of the event
   * @param url (optional) the url of the event
   * @param id (optional) the id of the event
   */
  constructor(
    type: string,
    title: string,
    description: string,
    date: string,
    startTime: string,
    endTime: string,
    location: string = "NVT",
    url: string = "NVT",
    id: number = 0
  ) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.url = url;
    this.id = id;
  }
  /**
   * it logs the event details in the console
   * @author Noah Beij
   */
  log() {
    console.log(
      "event",
      this.type,
      this.title,
      this.description,
      this.date,
      this.startTime,
      this.endTime,
      this.location,
      this.url,
      this.id
    );
  }
  /**
   * gives the duration of the event in minutes
   * @returns the duration of the event in minutes
   * @author Noah Beij
   */
  duration(): number {
    const [hours1, minutes1] = this.startTime.split(":").map(Number);
    const [hours2, minutes2] = this.endTime.split(":").map(Number);
    const date1 = new Date(0, 0, 0, hours1, minutes1);
    const date2 = new Date(0, 0, 0, hours2, minutes2);
    const difference = date2.getTime() - date1.getTime();
    const duration = Math.floor(difference / 1000 / 60);
    return duration;
  }

  /**
   * @param fromDate the date to count until the event
   * @returns the number of days until the event
   * @author Noah Beij
   */
  untilInDays(fromDate: Date): number {
    const eventDate = new Date(this.date);
    const difference = eventDate.getTime() - fromDate.getTime();
    const days = Math.floor(difference / 1000 / 60 / 60 / 24);
    return days + 1;
  }

  /**
   * gives back a JSON object of the event data
   * @returns a JSON object of the event data
   * @author Noah Beij
   */
  toJSON() {
    return {
      type: this.type,
      title: this.title,
      description: this.description,
      date: this.date,
      startTime: this.startTime,
      endTime: this.endTime,
      location: this.location,
      url: this.url,
    };
  }

  /**
   * posts the event to the database, and disables the button until its done
   * @param button the button to disable while posting the event
   * @author Noah Beij
   */
  async postEvent(button: HTMLInputElement) {
    button.setAttribute("disabled", "true");
    button.value = "Adding...";
    axios
      .post("http://localhost:3001/events", this.toJSON())
      .then((res) => {
        console.log(res);
        button.removeAttribute("disabled");
        button.value = "Add Event";
        showSnackbar("Event added successfully!", snackbarTypes.success);
      })
      .catch((err) => {
        console.log(err);
        showSnackbar(
          "Oh no! We could not add your event :(",
          snackbarTypes.error
        );
      });
  }

  /**
   * make a copy of the template and add the event data to it, then append it to the container
   * @param template the template element to clone
   * @param container the container to append the events to
   * @example event.addEventToHTML(template, container);
   * @listens doubleclick
   * @fires deleteEvent
   * @tutorial template https://www.nbeij.nl/blog/htmlTemplateTag
   * @author Noah Beij
   */
  addEventToHTML(template: HTMLTemplateElement, container: HTMLElement) {
    const event = template.content.cloneNode(true) as HTMLElement;

    const templateContainer = event.querySelector(
      "#eventTemplateContainer"
    ) as HTMLElement;
    templateContainer.addEventListener("dblclick", () => {
      if (confirm("Are you sure you want to delete this event?")) {
        axios
          .delete(`http://localhost:3001/events/${this.id}`)
          .then((res) => {
            console.log(res);
            templateContainer.remove();
            showSnackbar("Event deleted successfully!", snackbarTypes.success);
          })
          .catch((err) => {
            console.log(err);
            showSnackbar(
              "Oh no! We could not delete your event :(",
              snackbarTypes.error
            );
          });
      }
    });

    event.querySelector("#daysUntil")!.textContent = `${this.untilInDays(
      new Date()
    ).toString()} days`;
    const daysUntil = event.querySelector("#daysUntil") as HTMLElement;

    if (this.untilInDays(new Date()) === 0) {
      daysUntil.textContent = "Today";
    } else if (this.untilInDays(new Date()) === 1) {
      daysUntil.textContent = `${this.untilInDays(new Date()).toString()} day`;
    }
    event.querySelector("#title")!.textContent = this.title;
    event.querySelector("#date")!.textContent = this.date;
    event.querySelector("#description")!.textContent = this.description;

    if (this.type === events.Webinar) {
      const a = document.createElement("a");
      a.textContent = this.url;
      a.setAttribute("href", this.url);
      event.querySelector("#location")!.appendChild(a);
      // event.querySelector("#location")!.textContent = this.url
    } else {
      event.querySelector("#location")!.textContent = this.location;
    }

    event.querySelector("#type")!.textContent = this.type;
    event.querySelector("#startTime")!.textContent = this.startTime;
    event.querySelector("#endTime")!.textContent = this.endTime;
    event.querySelector(
      "#duration"
    )!.textContent = `${this.duration().toString()} minutes`;

    if (this.untilInDays(new Date()) < 4) {
      daysUntil.style.background = "green";
    } else if (this.untilInDays(new Date()) < 8) {
      daysUntil.style.background = "gold";
    } else {
      daysUntil.style.background = "red";
    }

    container.appendChild(event);
  }

  getTitle() {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getType() {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getDate() {
    return this.date;
  }

  setDate(date: string) {
    this.date = date;
  }

  getStartTime() {
    return this.startTime;
  }

  setStartTime(startTime: string) {
    this.startTime = startTime;
  }

  getEndTime() {
    return this.endTime;
  }

  setEndTime(endTime: string) {
    this.endTime = endTime;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location: string) {
    this.location = location;
  }

  getUrl() {
    return this.url;
  }

  setUrl(url: string) {
    this.url = url;
  }
}
