import getJoinedData from '../data-handler.js';

export function onSubmit(component, props) {
  if (component.closest('.fragment')?.classList.contains('hidden')) return;

  const rsvpFormFields = {
    visible: Array.from(component.querySelectorAll('sp-checkbox.check-appear[checked]')).map((f) => f.name),
    required: Array.from(component.querySelectorAll('sp-checkbox.check-require[checked]')).map((f) => f.name),
  };

  props.payload = { ...props.payload, rsvpFormFields };
}

export default function init(component, props) {
  const eventData = getJoinedData();
  const appearChecks = component.querySelectorAll('sp-checkbox.check-appear');
  const requireChecks = component.querySelectorAll('sp-checkbox.check-require');

  appearChecks.forEach((cb) => {
    if (eventData.rsvpFormFields?.visible?.includes(cb.name)) cb.checked = true;
  });

  requireChecks.forEach((cb) => {
    if (eventData.rsvpFormFields?.required?.includes(cb.name)) cb.checked = true;
  });
}
