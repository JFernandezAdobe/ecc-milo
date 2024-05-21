export function onSubmit(component) {
  // TODO: community URL
  const time = component.querySelector('#community-URL-details').value;
  const discussionLinkCheckbox = component.querySelector('#checkbox-community').checked;

  const eventInfo = {
    discussionLinkCheckbox,
    Time: time,
  };

  return eventInfo;
}

export function onResume(component, eventObj) {
  // TODO: community link resume function

}

export default function init(component) {
  // TODO: community link init function
}