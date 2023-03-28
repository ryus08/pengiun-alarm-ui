import rp from 'request-promise';
import { filter as _filter, find as _find } from 'lodash';

class NewRelicClient {
  constructor({ apiKey }) {
    this.apiKey = apiKey;
  }

  searchPolicy({ search }) {
    const options = {
      method: 'GET',
      url: `https://api.newrelic.com/v2/alerts_policies.json?filter[name]=${search}`,
      headers: {
        'X-Api-Key': this.apiKey,
      },
    };
    return rp(options).then((response) => JSON.parse(response));
  }

  getAlerts({ policies }) {
    const options = {
      method: 'GET',
      url: 'https://api.newrelic.com/v2/alerts_violations.json?only_open=true',
      headers: {
        'X-Api-Key': this.apiKey,
      },
    };

    return rp(options).then((response) => {
      const alerts = JSON.parse(response);
      const violations = _filter(alerts.violations, (violation) =>
        _find(policies, (policy) => violation.policy_name === policy),
      );
      return violations;
    });
  }
}

export default NewRelicClient;
