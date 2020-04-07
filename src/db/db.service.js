const { dbCreate, dbUpdate, dbDelete, dbGet } = require('./fake-data.service');
const CustomError = require('../helpers/custom-error');
const { getErrorText } = require('../constants/error-list');

const getAll = async tableName => {
  const result = await dbGet(tableName);
  if (result.error) throw new CustomError(getErrorText('errOnAccess'));
  return result;
};

const getById = async (tableName, id) => {
  const tempData = await getAll(tableName);
  const itemData = tempData.find(item => item.id === id);
  if (!itemData) throw new CustomError(getErrorText('errOnId'));
  return itemData ? itemData : {};
};

const createNote = async (tableName, noteData) => {
  const result = await dbCreate(tableName, noteData);
  if (result.error) throw new CustomError(getErrorText('errOnCreate'));
  return noteData.id;
};

const deleteNote = async (tableName, userId) => {
  const result = await dbDelete(tableName, userId);
  if (result.error) throw new CustomError(getErrorText('errOnDelete'));
  return userId;
};

const updateNote = async (tableName, userData) => {
  const result = await dbUpdate(tableName, userData);
  if (result.error) throw new CustomError(getErrorText('errOnUpdate'));
  return userData.id;
};

module.exports = { getAll, getById, createNote, deleteNote, updateNote };
