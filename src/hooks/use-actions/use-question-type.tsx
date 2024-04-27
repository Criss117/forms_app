"use client";

import { useTransition } from "react";
import { signOut, useSession } from "next-auth/react";

import { verifyResponse } from "@/lib";
import { FindQuestionTypes } from "@/actions/question-types";
import { useQuestionTypesStore } from "@/zustand";
import { QuestionType } from "@/actions/question-types/types";

const useQuestionTypes = () => {
  const { data } = useSession();
  const [isPending, setTransition] = useTransition();
  const { getQuestionTypes, setQuestionTypes } = useQuestionTypesStore();

  const fetchQuestionTypes = async () => {
    const newQuestionTypes: QuestionType[] = [];

    setTransition(async () => {
      if (data?.user.jwt === undefined) {
        return;
      }

      const questionTypes = getQuestionTypes();

      if (questionTypes.length > 0) {
        newQuestionTypes.push(...questionTypes);
        return;
      }

      await FindQuestionTypes({ jwtoken: data?.user.jwt }).then(
        ({ response }) => {
          const state = verifyResponse(response);
          if (state?.statusCode === 404) {
            signOut();
            return;
          }
          if (state?.success && response?.data) {
            newQuestionTypes.push(...response?.data);
            setQuestionTypes(response?.data);
          }
        }
      );
    });

    return newQuestionTypes;
  };

  return {
    isPending,
    fetchQuestionTypes,
  };
};

export default useQuestionTypes;
