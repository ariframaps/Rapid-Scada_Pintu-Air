export const AuthReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGGED_IN":
    case "LOGGED_OUT":
      return { ...state };
    case "CHECKING_LOGIN_DONE":
      return { ...state };
    default:
      throw new Error("gaada pilihan di auth reducernya");
  }
};
