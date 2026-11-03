import { useDataformsStore } from "@/stores/dataFormsStore";
import { useInputEvents } from "@/composables/useInputEvents";

export function useFieldType(props) {
  const { addField, updateField, getCurrentForm, addInput } = useDataformsStore();
  const { onChange } = useInputEvents(props);

  const field = ref(props.options?.default ?? null);

  const currentFormData = computed(() => getCurrentForm(props.formId));

  const stops = [];
  let isUnmounted = false;

  const initializeField = () => {
    const formFields = currentFormData.value?.fields;

    addField({
      formId: props.formId,
      fieldName: props.inputKey,
      fieldValue: formFields?.[props.inputKey] ?? field.value,
    });
    addInput(props.formId, props.inputKey, props.input);
  };

  const syncFieldWithFormData = () => {
    return watch(
      () => currentFormData.value?.fields?.[props.inputKey],
      (value) => {
        field.value = value;
      },
      { deep: true, immediate: true }
    );
  };

  const handleFieldChange = () => {
    return watch(field, (newValue, oldValue) => {
      if (newValue === undefined) return;
      if (newValue === oldValue) return;

      updateField({
        formId: props.formId,
        fieldName: props.inputKey,
        fieldValue: newValue,
      });
      onChange(newValue);
    });
  };

  onMounted(async () => {
    if (isUnmounted) return;
    await nextTick();

    initializeField();
    stops.push(syncFieldWithFormData());

    if (props.input?.readOnly) return;
    setTimeout(() => stops.push(handleFieldChange()), 250);
  });

  onBeforeUnmount(() => {
    isUnmounted = true;
    stops.forEach((stop) => stop());
  });

  return {
    field,
    currentFormData,
  };
}
