export function useSlotsPrepare() {
  const getApiSlots = (api) => {
    const items = [];

    if (api && api.tabs && api.tabs.items) {
      api.tabs.items.forEach((item) => {
        items.push(...(item && item.input));
      });
    }

    if (api && api.accordion && api.accordion.items) {
      api.accordion.items.forEach((item) => {
        items.push(...(item && item.input));
      });
    }

    if (api && api.input) {
      api.input.forEach((item) => {
        items.push(item);
      });
    }

    return [
      ...new Set(
        Object.values(items)
          .flatMap((item) => {
            if (item instanceof Array) {
              return item.flatMap((innerItem) => Object.values(innerItem));
            } else {
              return Object.values(item);
            }
          })
          .flatMap((obj) => {
            /*eslint-disable-next-line no-prototype-builtins */
            if (obj.hasOwnProperty("itemSlots")) {
              return obj.itemSlots;
            } else {
              return [];
            }
          })
      ),
    ];
  };
  const subLayoutSlots = (row) => {
    const subLayoutSlots = [];

    row.forEach((col) => {
      subLayoutSlots.push(...this.slots(col.input));
    });

    return subLayoutSlots;
  };

  const slots = (inputs) => {
    const slots = [];

    if (inputs && inputs.length) {
      inputs.map((col) =>
        Object.values(col)
          .filter((input) => input.itemSlots)
          .forEach((input) => slots.push(...input.itemSlots))
      );
    }
    return slots;
  };

  return {
    getApiSlots,
    subLayoutSlots,
    slots,
  };
}
