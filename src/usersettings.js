import { Path } from 'path-parser';
import { isEmpty as _isEmpty, get as _get } from 'lodash';

import queryString from 'query-string';
import PenguinClient from './clients/penguinclient';

const init = () => {
  let configPathRes;
  let searchPath;
  const configPath = new Path('/:config');

  if (window.location.hash) {
    const [first, second] = window.location.hash.split('?');
    const testPath = first.replace('#!', '');
    searchPath = second;

    configPathRes = configPath.test(testPath, { trailingSlash: true });
  } else if (window.location.pathname) {
    searchPath = window.location.search;
    configPathRes = configPath.test(window.location.pathname, {
      trailingSlash: true,
    });
  }

  let parsedValues = queryString.parse(searchPath);
  const addParams = (params) => {
    if (searchPath) {
      return `${window.location.href}&${queryString.stringify(params)}`;
    }
    return `${window.location.href}?${queryString.stringify(params)}`;
  };

  parsedValues = { ...parsedValues, startPage: 'home', addParams };

  if (configPathRes) {
    parsedValues.penguinClient = new PenguinClient({
      configName: configPathRes.config,
    });
    parsedValues.local = !parsedValues.tv;
  } else if (!_get(parsedValues, 'configUrl')) {
    // no configuration available,
    parsedValues.local = true;
    parsedValues.tv = false;
    parsedValues.startPage = 'config';
    parsedValues.noConfig = true;
  }

  if (_isEmpty(parsedValues)) {
    parsedValues = {
      local: true,
    };
  }

  parsedValues.gitLabActive = !!configPathRes || !!parsedValues.gitLabToken;

  return parsedValues;
};

const userSettings = init();

export default userSettings;
