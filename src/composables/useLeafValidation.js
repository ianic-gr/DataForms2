import { ref, onMounted, nextTick } from "vue";
import { useDataformsStore } from "@/stores/dataFormsStore";

export function useLeafValidation(props) {
  const { isFormValid, getCurrentForm } = useDataformsStore();

  const leaf = ref(0);

  const handleLeafError = async () => {
    let errorLeaves = [];

    if (!isFormValid(props.id)) {
      // Bigger leaf number to force retoggle.
      leaf.value = 9999;

      props.items.forEach((item, key) => {
        const fields = getCurrentForm(props.id).errors;

        // Input fields and dynamic component input fields
        const inputGroupsFields = item.inputGroups?.flatMap((inputGroup) => {
          return [...inputGroup.input, ...(inputGroup?.dynamic?.fields ?? [])];
        });

        const allFields = [
          ...(item?.input ?? []),
          ...(item.dynamic?.fields ?? []),
          ...(inputGroupsFields ?? []),
        ].filter(Boolean);

        allFields?.forEach((element) => {
          const fieldErrors = Object.keys(element).filter((inputKey) => {
            return fields[inputKey] && fields[inputKey].length > 0;
          });

          // If there are errors for the current item, add the key to errorLeaves
          if (fieldErrors.length > 0) {
            errorLeaves.push(key);
          }
        });
      });

      await nextTick();

      // If we found any errors, set the leaf to the first error's index
      if (errorLeaves.length > 0) {
        leaf.value = errorLeaves[0];
      }

      errorLeaves = [];
    }

    console.log("errorLeaves", errorLeaves);
  };

  onMounted(() => {
    document.addEventListener("changeLeaf", (e) => {
      leaf.value = e.detail.leaf;
    });
  });

  return { leaf, handleLeafError };
}
