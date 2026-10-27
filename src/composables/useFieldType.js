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

  const syncFieldWithFormData = () =>
    watch(
      () => currentFormData.value?.fields?.[props.inputKey],
      (value) => {
        field.value = value;
      }
    );

  const handleFieldChange = () =>
    watch(field, (newValue) => {
      if (newValue === undefined) return;

      updateField({
        formId: props.formId,
        fieldName: props.inputKey,
        fieldValue: newValue,
      });
      onChange(newValue);
    });

  onMounted(async () => {
    await nextTick();
    if (isUnmounted) return;

    stops.push(syncFieldWithFormData());
    initializeField();

    if (props.input?.readOnly) return;

    stops.push(handleFieldChange());
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
