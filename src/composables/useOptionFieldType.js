export function useOptionFieldType() {
  const optionLabel = (item) => {
    let label = item;

    if (typeof item === "object" && item !== null && !Array.isArray(item)) {
      if ("text" in item) {
        label = item.text;
      }

      if ("label" in item) {
        label = item.label;
      }
    }

    return label;
  };

  const optionValue = (item) => {
    return typeof item === "object" && item !== null && !Array.isArray(item)
      ? item.value
      : item;
  };

  return { optionLabel, optionValue };
}
