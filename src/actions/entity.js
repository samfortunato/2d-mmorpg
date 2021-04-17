import { UPDATE_ENTITIES } from '../constants/action-types/entity';

export function updateEntities(entities) {
  return {
    type: UPDATE_ENTITIES,
    entities,
  };
};
