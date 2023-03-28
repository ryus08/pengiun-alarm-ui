import P from 'bluebird';
import poll from './poll';

export default function activityPoller({ config, update }) {
  poll({
    name: 'activity poller',
    pollFunction: () => {
      const configuration = config();

      // no configuration at all, lets see if one comes in
      if (!configuration) {
        return P.resolve(1000);
      }

      // configuration is not valid, but maybe it will be later
      if (!configuration.pollMethod) {
        return P.resolve(5000);
      }

      return configuration
        .pollMethod()
        .then((data) => update({ data }))
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        })
        .return(configuration.refreshRate);
    },
  });
}
