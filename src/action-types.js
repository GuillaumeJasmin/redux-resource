// This function generates the five statuses from a single CRUD action.
// For instance, you'd probably pass "CREATE", "RETRIEVE", "UPDATE", or "DELETE"
// as `crudAction`.
const mapConstant = (resourceName, crudAction) => ({
  [`${crudAction}_${resourceName}`]: `${crudAction}_${resourceName}`,
  [`${crudAction}_${resourceName}_SUCCESS`]: `${crudAction}_${resourceName}_SUCCESS`,
  [`${crudAction}_${resourceName}_FAILURE`]: `${crudAction}_${resourceName}_FAILURE`,
  [`${crudAction}_${resourceName}_ABORTED`]: `${crudAction}_${resourceName}_ABORTED`,
  [`${crudAction}_${resourceName}_RESET_RESOLUTION`]: `${crudAction}_${resourceName}_RESET_RESOLUTION`,
});

// This is a map of the four CRUD operations to the five async action types
export default (resourceName, pluralForm, allowedOperations) => {
  const capitalResourceName = resourceName.toUpperCase();
  const capitalPluralName = pluralForm.toUpperCase();
  const {create, readOne, readMany, update, del} = allowedOperations;

  const createTypes = create ? mapConstant(capitalResourceName, 'CREATE') : {};
  const readOneTypes = readOne ? mapConstant(capitalResourceName, 'RETRIEVE') : {};
  const readManyTypes = readMany ? mapConstant(capitalPluralName, 'RETRIEVE') : {};
  const updateTypes = update ? mapConstant(capitalResourceName, 'UPDATE') : {};
  const deleteTypes = del ? mapConstant(capitalResourceName, 'DELETE') : {};

  return {
    ...createTypes,
    ...readOneTypes,
    ...readManyTypes,
    ...updateTypes,
    ...deleteTypes,
  };
};
