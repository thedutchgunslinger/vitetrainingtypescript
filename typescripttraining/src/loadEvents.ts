import axios from "axios";
import event from "./event";

const template = document.querySelector("#eventTemplate")! as HTMLTemplateElement;
const container = document.querySelector("#eventsContainer")! as HTMLElement;


axios.get("http://localhost:3001/events?_sort=date").then((res) => {
  console.log(res.data);
  res.data.forEach((loadedEvent: any) => {
    let newEvent = new event(
      loadedEvent.type,
      loadedEvent.title,
      loadedEvent.description,
      loadedEvent.date,
      loadedEvent.startTime,
      loadedEvent.endTime,
      loadedEvent.location,
      loadedEvent.url,
      loadedEvent.id
    );
    newEvent.addEventToHTML(template, container);
  });
});
