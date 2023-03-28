import { map as _map, get as _get } from 'lodash';
import P from 'bluebird';
import poll from './poll';
import NewRelicClient from '../clients/newrelicclient';

export default function newRelicPoller({ config, update, err }) {
  poll({
    name: 'New Relic',
    pollFunction: () => {
      const configuration = config();

      if (!configuration) {
        return P.resolve(1000);
      }

      if (!(configuration.apiKey && configuration.policies)) {
        return P.resolve(_get(configuration, 'refreshRate', 60000));
      }

      const newRelicClient = new NewRelicClient(configuration);
      return newRelicClient
        .getAlerts(configuration)
        .then((violations) => {
          const names = _map(violations, (violation) => ({
            name: `${violation.label} (${violation.entity.name})`,
            link: `https://alerts.newrelic.com/accounts/1328207/incidents/${violation.links.incident_id}/violations`,
          }));
          update(names);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
          err({ e });
        })
        .return(configuration.refreshRate);
    },
  });
}
