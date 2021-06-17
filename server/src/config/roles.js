const roles = ['user', 'admin', 'candidate'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUser', 'getUsers', 'manageUsers', 'getAllCV', 'getaCV']);
roleRights.set(roles[2], ['getUser', 'updateUser', 'getAllCV', 'getaCV']);

module.exports = {
  roles,
  roleRights,
};
