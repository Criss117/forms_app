export const API_ENDPOINTS = {
  USER: {
    CREATE: "/user",
    CONFIRM_ACCOUNT: "/user/confirm",
    VERIFY_EMAIL: "/user/verify",
    CHANGE_PASSWORD: "/user/change-password",
    LOGIN: "/auth",
    IS_AUTH: "/user/is-authenticated",
    FINDMANY: "/user/find-users",
  },
  FOLDER: {
    FIND: "/folder",
    CREATE: "/folder",
    ADD_MEMBERS: "/folder/add-members",
  },
  FORM: {
    CREATE: "/form",
  },
  TYPES: {
    FIND: "/types",
  },
};
