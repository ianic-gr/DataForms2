import { ref, onMounted, nextTick } from "vue";
import { useDataformsStore } from "@/stores/dataFormsStore";

export function useLeafValidation(props) {
  const { isFormValid, getCurrentForm } = useDataformsStore();

  const leaf = ref(0);

  const handleLeafError = async () => {
    let errorLeaf = null;

    if (!isFormValid(props.id)) {
      // Bigger leaf number to force retoggle.
      leaf.value = 9999;

      // Checks if set of items exists in observer error to assign the correct leaf.
      props.items.filter((item, key) => {
        const fields = getCurrentForm(props.id).errors;

        const fieldsErrors = Object.keys(item.input?.[0] ?? {}).filter(
          (itemKeys) => {
            return (
              typeof fields[itemKeys] !== "undefined" &&
              fields[itemKeys].length > 0
            );
          }
        );

        if (errorLeaf === null) {
          errorLeaf = fieldsErrors.length ? key : null;
        }
      });

      await nextTick();

      if (errorLeaf !== null) {
        leaf.value = errorLeaf;
      }
      errorLeaf = null;
    }
  };

  onMounted(() => {
    document.addEventListener("changeLeaf", (e) => {
      leaf.value = e.detail.leaf;
    });
  });

  return { leaf, handleLeafError };
}
