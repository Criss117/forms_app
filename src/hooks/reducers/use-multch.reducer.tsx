"use client";

import { useEffect, useReducer } from "react";
import { multcReducer, multcReducerInitalState } from ".";

const useMultchReducer = () => {
  const [state, dispatch] = useReducer(multcReducer, multcReducerInitalState);

  useEffect(() => {
    dispatch({ type: "setMultc" });
  }, []);

  const addAnswer = () => {
    dispatch({ type: "addAnswer" });
  };

  const removeAnswer = (answerId: number) => {
    dispatch({ type: "removeAnswer", payload: answerId });
  };

  return { answers: state.answers, addAnswer, removeAnswer };
};
export default useMultchReducer;
