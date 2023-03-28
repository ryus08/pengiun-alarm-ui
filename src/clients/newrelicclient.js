import { filter as _filter, find as _find } from 'lodash';

class NewRelicClient {
  constructor({ apiKey }) {
    this.apiKey = apiKey;
  }

  searchPolicy({ search }) {
    const options = {
      method: 'GET',
      headers: {
        'X-Api-Key': this.apiKey,
      },
    };
    return fetch(
      `https://api.newrelic.com/v2/alerts_policies.json?filter[name]=${search}`,
      options,
    ).then((response) => JSON.parse(response));
  }

  getAlerts({ policies }) {
    const options = {
      method: 'GET',
      headers: {
        'X-Api-Key': this.apiKey,
      },
    };

    return fetch(
      'https://api.newrelic.com/v2/alerts_violations.json?only_open=true',
      options,
    ).then((response) => {
      const alerts = JSON.parse(response);
      const violations = _filter(alerts.violations, (violation) =>
        _find(policies, (policy) => violation.policy_name === policy),
      );
      return violations;
    });
  }
}

export default NewRelicClient;
