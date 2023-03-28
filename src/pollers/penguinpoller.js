import P from 'bluebird';
import poll from './poll';

export default function penguinPoller({ config, update }) {
  poll({
    name: 'penguin poller',
    pollFunction: () => {
      const configuration = config();

      // no configuration at all, lets see if one comes in
      if (!configuration) {
        return P.resolve(1000);
      }

      // configuration is not valid, but maybe it will be later
      if (!(configuration.penguinClient && configuration.type)) {
        return P.resolve(5000);
      }

      let pollType;
      if (configuration.type === 'merges') {
        pollType = () =>
          configuration.penguinClient
            .getMerges()
            .then((merges) => update({ merges }));
      } else {
        pollType = () =>
          P.all([
            configuration.penguinClient.getDeployments(),
            configuration.penguinClient.getDeploymentHistory(),
          ]).then((values) =>
            update({ deployments: values[0], history: values[1] }),
          );
      }

      return new P(() => pollType())
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        })
        .return(configuration.refreshRate);
    },
  });
}
