const errorList = {
  defaultMsg: 'Unexpected error.',
  noBoard: 'No board found.',
  errOnAccess: 'Db access error',
  errOnUpdate: 'Error on update',
  errOnCreate: 'Error on create',
  errOnDelete: 'Error on delete',
  errOnId: 'Error on such Id'
};

const getErrorText = key =>
  errorList[key] ? errorList[key] : errorList.defaultMsg;

module.exports = { getErrorText };
