/**
 * Role-Based Access Control (RBAC) Utilities
 * Provides functions to check user permissions based on their role
 */

/**
 * Role Definitions
 */
export const ROLES = {
  ADMIN: 'admin',
  ACCOUNTANT: 'accountant',
  TEACHER: 'teacher',
  PARENT: 'parent'
};

/**
 * Permission definitions for each role
 */
const PERMISSIONS = {
  [ROLES.ADMIN]: {
    canEdit: true,
    canDelete: true,
    canCreate: true,
    canViewUsers: true,
    canManageUsers: true,
    canViewReports: true,
    canViewAnalytics: true,
    canPrint: true,
  },
  [ROLES.ACCOUNTANT]: {
    canEdit: false,
    canDelete: false,
    canCreate: false,
    canViewUsers: false,
    canManageUsers: false,
    canViewReports: true,
    canViewAnalytics: true,
    canPrint: true,
  },
  [ROLES.TEACHER]: {
    canEdit: false,
    canDelete: false,
    canCreate: false,
    canViewUsers: false,
    canManageUsers: false,
    canViewReports: false,
    canViewAnalytics: false,
    canPrint: false,
  },
  [ROLES.PARENT]: {
    canEdit: false,
    canDelete: false,
    canCreate: false,
    canViewUsers: false,
    canManageUsers: false,
    canViewReports: false,
    canViewAnalytics: false,
    canPrint: false,
  }
};

/**
 * Check if user has a specific permission
 * @param {Object} user - Current user object with role property
 * @param {string} permission - Permission to check
 * @returns {boolean} True if user has permission
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.role) {
    return false;
  }

  const userPermissions = PERMISSIONS[user.role];
  return userPermissions ? userPermissions[permission] : false;
};

/**
 * Check if user can edit records
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canEdit = (user) => hasPermission(user, 'canEdit');

/**
 * Check if user can delete records
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canDelete = (user) => hasPermission(user, 'canDelete');

/**
 * Check if user can create records
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canCreate = (user) => hasPermission(user, 'canCreate');

/**
 * Check if user can view users section
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canViewUsers = (user) => hasPermission(user, 'canViewUsers');

/**
 * Check if user can manage users
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canManageUsers = (user) => hasPermission(user, 'canManageUsers');

/**
 * Check if user can view reports
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canViewReports = (user) => hasPermission(user, 'canViewReports');

/**
 * Check if user can view analytics
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canViewAnalytics = (user) => hasPermission(user, 'canViewAnalytics');

/**
 * Check if user can print
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canPrint = (user) => hasPermission(user, 'canPrint');

/**
 * Get user role display name
 * @param {string} role - Role string
 * @returns {string} Formatted role name
 */
export const getRoleDisplayName = (role) => {
  const displayNames = {
    [ROLES.ADMIN]: 'Administrator',
    [ROLES.ACCOUNTANT]: 'Accountant',
    [ROLES.TEACHER]: 'Teacher',
    [ROLES.PARENT]: 'Parent'
  };
  return displayNames[role] || 'Unknown';
};

/**
 * Check if user is admin
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const isAdmin = (user) => user?.role === ROLES.ADMIN;

/**
 * Check if user is accountant
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const isAccountant = (user) => user?.role === ROLES.ACCOUNTANT;

export default {
  hasPermission,
  canEdit,
  canDelete,
  canCreate,
  canViewUsers,
  canManageUsers,
  canViewReports,
  canViewAnalytics,
  canPrint,
  getRoleDisplayName,
  isAdmin,
  isAccountant,
  ROLES
};
