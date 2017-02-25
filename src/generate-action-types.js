// This function generates the five statuses from a single CRUD action.
// For instance, you'd probably pass "CREATE", "RETRIEVE", "UPDATE", or "DELETE"
// as `crudAction`.
const mapConstant = (resourceName, crudAction) => ({
  [`${crudAction}_${resourceName}`]: `${crudAction}_${resourceName}`,
  [`${crudAction}_${resourceName}_SUCCEED`]: `${crudAction}_${resourceName}_SUCCEED`,
  [`${crudAction}_${resourceName}_FAIL`]: `${crudAction}_${resourceName}_FAIL`,
  [`${crudAction}_${resourceName}_ABORT`]: `${crudAction}_${resourceName}_ABORT`,
  [`${crudAction}_${resourceName}_RESET`]: `${crudAction}_${resourceName}_RESET`,
});

// This is a map of the four CRUD actions to the five async action types
export default (resourceName, pluralForm, supportedActions, customTypes) => {
  const capitalResourceName = resourceName.toUpperCase();
  const capitalPluralName = pluralForm.toUpperCase();
  const {create, readOne, readMany, update, del} = supportedActions;

  const createTypes = create ? mapConstant(capitalResourceName, 'CREATE') : {};
  const readOneTypes = readOne ? mapConstant(capitalResourceName, 'READ') : {};
  const readManyTypes = readMany ? mapConstant(capitalPluralName, 'READ_MANY') : {};
  const updateTypes = update ? mapConstant(capitalResourceName, 'UPDATE') : {};
  const deleteTypes = del ? mapConstant(capitalResourceName, 'DELETE') : {};

  const custom = {};
  customTypes.forEach(value => (custom[value] = value));

  return {
    ...createTypes,
    ...readOneTypes,
    ...readManyTypes,
    ...updateTypes,
    ...deleteTypes,
    ...custom
  };
};
