import {
  FORM_INPUTS,
  MULTIPLE_CHOISE_LIMIT,
  MultipleChoiceInput,
} from "@/lib/constants";

export type MultcReducerActions =
  | {
      type: "setMultc";
    }
  | {
      type: "addAnswer";
    }
  | {
      type: "removeAnswer";
      payload: number;
    };

export type MultcReducerState = {
  answers: Array<MultipleChoiceInput>;
};

export const multcReducerInitalState: MultcReducerState = {
  answers: FORM_INPUTS.MULTIPLE_CHOICE_INPUTS,
};

export function multcReducer(
  state: MultcReducerState,
  action: MultcReducerActions
) {
  const { MULTIPLE_CHOICE_INPUTS } = FORM_INPUTS;

  switch (action.type) {
    case "setMultc":
      return {
        answers: MULTIPLE_CHOICE_INPUTS,
      };
    case "addAnswer":
      if (state.answers.length >= MULTIPLE_CHOISE_LIMIT) return state;

      let index = -1;

      const currentIndex = state.answers.map((input) => input.id);

      for (let i = 0; i < state.answers.length; i++) {
        if (currentIndex.includes(index)) {
          index = index - 1;
        }
      }

      const newAnswer: MultipleChoiceInput = {
        id: index,
        name: `answ${Math.abs(index)}` as MultipleChoiceInput["name"],
        placeholder: "Respuesta",
        type: "text",
      };

      return {
        answers: [...state.answers, newAnswer],
      };
    case "removeAnswer":
      const answerId = action.payload;

      if (state.answers.length < 2) {
        return state;
      }

      const newAnswers = state.answers.filter((input) => input.id !== answerId);

      return {
        answers: newAnswers,
      };
  }
  return state;
}
