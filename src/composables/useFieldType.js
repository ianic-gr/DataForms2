import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useDataformsStore } from "@/stores/dataFormsStore";
import { useInputEvents } from "@/composables/useInputEvents";

export function useFieldType(props) {
  const { addField, updateField, getCurrentForm, addInput } =
    useDataformsStore();
  const { onChange } = useInputEvents(props);

  const field = ref(null);

  const getCurrentFormData = computed(() => {
    return getCurrentForm(props.formId);
  });

  onMounted(async () => {
    await nextTick();

    field.value = props.options?.default ?? null;

    addField({
      formId: props.formId,
      fieldName: props.name,
      fieldValue: field.value,
    });

    addInput(props.formId, props.inputKey, props.input);

    watch(
      getCurrentFormData,
      (data) => {
        if ("binder" in data) {
          field.value = data.binder[props.name];
        }
      },
      { deep: true }
    );

    watch(field, (val) => {
      if (typeof val === "undefined") return;

      updateField({
        formId: props.formId,
        fieldName: props.name,
        fieldValue: val,
      });

      onChange(val);
    });
  });

  return {
    field,
    getCurrentFormData,
  };
}
