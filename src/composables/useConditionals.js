import { computed } from "vue";
import { useDataformsStore } from "@/stores/dataFormsStore";

export function useConditionals(formID) {
  const { getCurrentForm } = useDataformsStore();

  const binder = computed(() => {
    const currentForm = getCurrentForm(formID);
    return currentForm?.binder ?? {};
  });

  /**
   * This function takes an array of objects
   * that compares its values with the binder of the current form
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
    console.log(conditionals);
    if (!conditionals || !conditionals.length) {
      return true;
    }

    const conditionalArr = [0];
    conditionals.forEach((batch, i) => {
      const conditionalBatchArr = [0];

      Object.entries(batch).forEach(([key, value], i) => {
        conditionalBatchArr[i] = 0;

        if (Array.isArray(binder.value[key])) {
          if (binder.value[key].includes(value)) {
            conditionalBatchArr[i] = 1;
          }
        } else {
          if (binder.value[key] === value) {
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
