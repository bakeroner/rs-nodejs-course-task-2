const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const dbData = {
  boards: [new Board()],
  tasks: [],
  users: [new User()]
};

const errorObj = {
  error: true
};

const successObj = {
  error: false
};

const dbConnecnt = async tableName => {
  return typeof dbData[tableName] === 'undefined' ? errorObj : successObj;
};

const dbGet = async tableName => {
  if (dbConnecnt(tableName).error) return errorObj;
  return [...dbData[tableName]];
};

const dbCreate = async (tableName, note) => {
  if (dbConnecnt(tableName).error) return errorObj;
  dbData[tableName].push({ ...note });
  return successObj;
};

const dbUpdate = async (tableName, note) => {
  if (dbConnecnt(tableName).error) return errorObj;
  const noteIndex = dbData[tableName].findIndex(item => item.id === note.id);
  if (noteIndex === -1) return errorObj;
  dbData[tableName][noteIndex] = { ...note };
  return successObj;
};

const dbDelete = async (tableName, noteId) => {
  if (dbConnecnt(tableName).error) return errorObj;
  dbData[tableName] = dbData[tableName].filter(note => note.id !== noteId);
  return successObj;
};

module.exports = { dbCreate, dbUpdate, dbDelete, dbGet };
