import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useDataformsStore } from "@/stores/dataFormsStore";
import { useInputEvents } from "@/composables/useInputEvents";

export function useFieldType(props) {
  const { addField, updateField, getCurrentForm, addInput } =
    useDataformsStore();
  const { onChange } = useInputEvents(props);

  const field = ref(props.options?.default ?? null);

  const currentFormData = computed(() => getCurrentForm(props.formId));

  const initializeField = () => {
    addField({
      formId: props.formId,
      fieldName: props.inputKey,
      fieldValue: field.value,
    });
    addInput(props.formId, props.inputKey, props.input);
  };

  // Syncs field value with form data when form data changes
  const syncFieldWithFormData = () => {
    watch(
      currentFormData,
      (data) => {
        if (data?.binder) {
          field.value = data.binder[props.inputKey];
        }
      },
      { deep: true }
    );
  };

  // Watches field value changes and updates the store and triggers onChange event
  const handleFieldChange = () => {
    watch(field, (newValue) => {
      if (newValue !== undefined) {
        updateField({
          formId: props.formId,
          fieldName: props.inputKey,
          fieldValue: newValue,
        });
        onChange(newValue);
      }
    });
  };

  onMounted(async () => {
    await nextTick();

    if (props.input?.readOnly) return;

    initializeField();
    syncFieldWithFormData();
    handleFieldChange();
  });

  return {
    field,
    currentFormData,
  };
}
