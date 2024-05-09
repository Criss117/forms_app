import { User } from "@/actions/user";

export type MembersReducerActions =
  | { type: "setMembers"; payload: User[] }
  | { type: "setIsSearching"; payload?: boolean }
  | { type: "clear" };

export type MembersState = { members: Array<User>; isSearching: boolean };

export const membersInitalState: MembersState = {
  members: [],
  isSearching: false,
};

export const membersReducer = (
  state: MembersState,
  action: MembersReducerActions
) => {
  switch (action.type) {
    case "setMembers":
      return {
        ...state,
        members: action.payload,
      };
    case "setIsSearching":
      return {
        ...state,
        isSearching: action.payload || !state.isSearching,
      };
    case "clear":
      return membersInitalState;
  }
  return state;
};
