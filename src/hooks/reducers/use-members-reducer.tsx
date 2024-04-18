"use client";

import { useEffect, useReducer, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useDebounce } from "@uidotdev/usehooks";
import { membersInitalState, membersReducer } from "./member-reducer";
import { findUsers } from "@/actions/user";
import { verifyResponse } from "@/lib";

const useMembersReducer = () => {
  const { data } = useSession();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);

  const [membersState, dispatch] = useReducer(
    membersReducer,
    membersInitalState
  );

  const findUsersHandler = (query: string) => {
    dispatch({ type: "setIsSearching" });
    setQuery(query);
  };

  useEffect(() => {
    if (debouncedQuery) {
      findUsersHook(debouncedQuery);
    }
  }, [debouncedQuery]);

  const findUsersHook = (query: string) => {
    if (query.length < 3) {
      return;
    }

    if (data?.user.jwt === undefined) {
      signOut();
      return;
    }

    const findUsersQuery = {
      query: query.trim(),
      jwtoken: data?.user.jwt,
    };

    dispatch({ type: "setIsSearching", payload: true });

    findUsers(findUsersQuery)
      .then(({ response }) => {
        console.log({ response });
        const state = verifyResponse(response);
        if (state?.statusCode === 404) {
          signOut();
          return;
        }

        dispatch({
          type: "setMembers",
          payload: response?.data || [],
        });
      })
      .finally(() => {
        dispatch({ type: "setIsSearching", payload: false });
      });
  };

  return {
    members: membersState.members,
    isSearching: membersState.isSearching,
    findUsersHandler,
  };
};

export default useMembersReducer;
