import { combineReducers } from 'redux';
import configuration from './configuration';
import mergeParticipation from './mergeparticipation';
import openMerge from './openmerge';
import production from './production';
import deployments from './deployments';
import configEdit from './configedit';
import activity from './activity';
import achievements from './achievements';
import userPreferences from './userpreferences';
import effort from './effort';
import opinions from './opinions';

const reducers = combineReducers({
  configuration,
  openMerge,
  mergeParticipation,
  production,
  deployments,
  configEdit,
  activity,
  achievements,
  userPreferences,
  effort,
  opinions,
});

export default reducers;
