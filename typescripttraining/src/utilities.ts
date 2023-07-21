/**
 * a function that takes an array and number and gives back the value of the index at that number
 * @param array the array of titles to select from
 * @param number the selected index
 * @returns  the selected title
 * @author Noah Beij
 */
export function selectRandNum(array: string[], number: number): string {
  return array[number];
}


export enum events {
    Webinar = "Webinar",
    Workshop = "Workshop",
    Hackathon = "Hackathon",
    Meetup = "Meetup",
    Conference = "Conference",
    Concert = "Concert"
}

export enum snackbarTypes {
  success = "success",
  error = "error",
}

/**
 * the snackbar is a small popup that shows a message for a few seconds`
 * @param text the text to show in the snackbar
 * @param type the type of the snackbar to show, either success or error 
 * @example showSnackbar("this is a snackbar", snackbarTypes.success)
 * @author Noah Beij
 */
export function showSnackbar(text: string, type: string) {
  const x = document.getElementById("snackbar") as HTMLElement;
  x.textContent = text;
  if(type === snackbarTypes.success){
    x.style.backgroundColor = "#4CAF50";
  } else if (type === snackbarTypes.error){
    x.style.backgroundColor = "#f44336";
  }

  x.className = "show";
  setTimeout( () => {
    x.className = x.className.replace("show", "");
    x.style.backgroundColor = "#333";
    x.textContent = "";
  }, 3000);
}

