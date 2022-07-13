type Props = {
  event?: any;
  name?: any;
  value?: any;
  type?: any;
};

const trackEvent = ({ event, name, value, type = 'type' }: Props) => {
  const { splitbee } = window as any;

  if (splitbee) {
    if (!name) return;
    if (name === value) {
      splitbee.track(name);
    }
  } else {
    splitbee.track(name, { [type]: value });
  }
};

export default trackEvent;
