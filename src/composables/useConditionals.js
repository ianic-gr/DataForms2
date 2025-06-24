import { computed } from "vue";
import { useDataformsStore } from "@/stores/dataFormsStore";

export function useConditionals(formID) {
  const { getCurrentForm } = useDataformsStore();

  const formFields = computed(() => {
    const currentForm = getCurrentForm(formID);
    return currentForm?.fields ?? {};
  });

  /**
   * This function takes an array of objects
   * that compares its values with the formFields of the current form
   * and returns a boolean value.
   *
   * the array compares its objects with OR operator,
   * while the child objects compare its values with AND operator
   *
   * e.g
   * [ {arg1: true, arg2: false} ] = false,
   * [ {arg1: true, arg2: false}, { arg1: true } ] = true
   *
   * @var		Boolean	showOnConditions
   */
  const showOnConditions = (conditionals) => {
    if (!conditionals || !conditionals.length) {
      return true;
    }

    const conditionalArr = [0];
    conditionals.forEach((batch, i) => {
      const conditionalBatchArr = [0];

      Object.entries(batch).forEach(([key, value], i) => {
        conditionalBatchArr[i] = 0;

        if (Array.isArray(formFields.value[key])) {
          if (formFields.value[key].includes(value)) {
            conditionalBatchArr[i] = 1;
          }
        } else {
          if (formFields.value[key] === value) {
            conditionalBatchArr[i] = 1;
          }
        }
      });

      conditionalArr[i] = conditionalBatchArr.reduce((x, y) => x * y);
    });

    return Boolean(conditionalArr.reduce((x, y) => x + y));
  };

  return {
    showOnConditions,
  };
}
