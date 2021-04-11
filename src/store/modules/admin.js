import adminApi from '@/api/admin';

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const actionTypes = {
    getAdmins: '[admin] getAdmins',
    deleteAdmin: '[admin] deleteAdmin'
}

export const mutationTypes = {
    getAdminsStart: '[admin] getAdminsStart',
    getAdminsSuccess: '[admin] getAdminsSuccess',
    getAdminsFailure: '[admin] getAdminsFailure',

    deleteAdminStart: '[admin] deleteAdminStart',
    deleteAdminSuccess: '[admin] deleteAdminSuccess',
    deleteAdminFailure: '[admin] deleteAdminFailure',
}