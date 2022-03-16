function trackEvent({ name, value, type = 'type' }) {
  const { splitbee } = window as any;

  if (splitbee) {
    if (!name) return;
    if (name === value) {
      splitbee.track(name);
    }
  } else {
    splitbee.track(name, { [type]: value });
  }
}
