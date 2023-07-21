import { events } from "./utilities";
import event from "./event";

const eventsSelector = <HTMLInputElement>(
  document.querySelector("#eventsSelector")
);
const eventTitle = <HTMLInputElement>document.querySelector("#eventTitle");
const eventDescription = <HTMLInputElement>(
  document.querySelector("#eventDescription")
);
const eventDate = <HTMLInputElement>document.querySelector("#eventDate");
const eventStartTime = <HTMLInputElement>(
  document.querySelector("#eventStartTime")
);
const eventEndTime = <HTMLInputElement>document.querySelector("#eventEndTime");
const eventLocation = <HTMLInputElement>(
  document.querySelector("#eventLocation")
);
const eventUrl = <HTMLInputElement>document.querySelector("#eventUrl");
const form = <HTMLFormElement>document.querySelector("#formControll");

const eventBtn = document.querySelector("#addEventBtn") as HTMLInputElement;

if (eventsSelector) {
  for (let event in events) {
    const option = document.createElement("option");
    option.value = event;
    option.text = event;
    eventsSelector.appendChild(option);
  }

  eventsSelector.addEventListener("change", () => {
    if (eventsSelector.value === events.Webinar) {
      eventLocation.setAttribute("disabled", "true");
      eventUrl.removeAttribute("disabled");
    } else {
      eventUrl.setAttribute("disabled", "true");
      eventLocation.removeAttribute("disabled");
    }
  });
}
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newEvent = new event(
      eventsSelector!.value,
      eventTitle!.value,
      eventDescription!.value,
      eventDate!.value,
      eventStartTime!.value,
      eventEndTime!.value,
      eventLocation!.value,
      eventUrl!.value
    );
    newEvent.postEvent(eventBtn);
    newEvent.log();


    eventsSelector!.value = events.Webinar;
    eventTitle!.value = "";
    eventDescription!.value = "";
    eventDate!.value = "";
    eventStartTime!.value = "";
    eventEndTime!.value = "";
    eventLocation!.value = "";
    eventUrl!.value = "";
  });
}
