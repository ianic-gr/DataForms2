import { useFieldType } from "@/composables/useFieldType";
import moment from "moment";

export function useDateTimeFieldType(props) {
  // Base field type setup
  const _useFieldType = useFieldType(props);
  const { field } = _useFieldType;

  const defaultDateFormat = "MM-DD-YYYY";
  const defaultTimeFormat = "HH:mm";

  const tempDate = ref("");
  const tempTime = ref("");
  const initialized = ref(false);

  const format = computed(
    () => props.options?.returnFormat ?? `${defaultDateFormat} ${defaultTimeFormat}`
  );
  const dateFormat = computed(() => format.value.split(" ")[0] ?? defaultDateFormat);
  const displayFormat = computed(() => props.options?.format ?? defaultDateFormat);

  const isMultiple = computed(
    () =>
      props.input.type === "datepicker" &&
      props.options?.datepicker &&
      "multiple" in props.options.datepicker
  );

  const parseDateTime = (value, format) => {
    const parsed = moment(value, format);
    return parsed.isValid() ? parsed : null;
  };

  const formatDateTime = (value, format) => {
    const parsed = parseDateTime(value, format.value);
    return parsed ? parsed.format(format) : "";
  };

  const parseDefaultValue = () => {
    if (initialized.value) return;
    if (!field.value && !props.input.options.default) return;

    const defaultVal = field.value || props.input.options.default;

    if (props.input.type === "dateTimePicker") {
      const parsedDateTime = parseDateTime(defaultVal, format.value);
      if (parsedDateTime) {
        field.value = parsedDateTime.format(format.value);
        tempDate.value = parsedDateTime.toDate();
        tempTime.value = parsedDateTime.format(defaultTimeFormat);
      }
    } else if (isMultiple.value) {
      handleMultipleDefaultValue(defaultVal);
    } else {
      const parsedDate = parseDateTime(defaultVal, format.value);
      if (parsedDate) {
        field.value = parsedDate.format(format.value);
        tempDate.value = parsedDate.toDate();
      }
    }

    initialized.value = true;
  };

  const handleMultipleDefaultValue = (defaultVal) => {
    if (!Array.isArray(defaultVal)) return;

    if (props.options.datepicker.multiple === "range" && defaultVal.length === 2) {
      const [startDate, endDate] = defaultVal.map((val) =>
        parseDateTime(val, format.value)
      );
      if (startDate?.isValid() && endDate?.isValid()) {
        const dates = [];
        let currentDate = startDate.clone();
        while (currentDate.isSameOrBefore(endDate)) {
          dates.push(currentDate.format(format.value));
          currentDate.add(1, "days");
        }
        field.value = dates;
        tempDate.value = dates.map((date) => parseDateTime(date, format.value).toDate());
      }
    } else {
      const validDates = defaultVal
        .map((val) => {
          const parsedDate = parseDateTime(val, format.value);
          return parsedDate?.isValid() ? parsedDate.format(format.value) : null;
        })
        .filter(Boolean);
      field.value = validDates;
      tempDate.value = validDates.map((date) =>
        parseDateTime(date, format.value).toDate()
      );
    }
  };

  const date = computed({
    get: () => {
      const fieldValue = tempDate.value ?? field.value;
      if (!fieldValue) return null;

      if (isMultiple.value && Array.isArray(fieldValue)) {
        return fieldValue
          .map((val) => {
            if (val instanceof Date) return val;
            const parsedDate = parseDateTime(val, dateFormat.value);
            return parsedDate?.isValid() ? parsedDate.toDate() : null;
          })
          .filter(Boolean);
      }

      if (fieldValue instanceof Date) return fieldValue;
      const parsedDate = parseDateTime(fieldValue, dateFormat.value);
      return parsedDate?.isValid() ? parsedDate.toDate() : null;
    },
    set: (value) => {
      if (!value) {
        tempDate.value = "";
        field.value = "";
        return;
      }

      if (isMultiple.value && Array.isArray(value)) {
        tempDate.value = value;
        field.value = value.map((val) => moment(val).format(dateFormat.value));
      } else {
        tempDate.value = value;
        if (props.input.type === "dateTimePicker" && tempTime.value) {
          const dateTime = moment(value).format("YYYY-MM-DD") + " " + tempTime.value;
          field.value = moment(dateTime).format(format.value);
        } else {
          field.value = moment(value).format(dateFormat.value);
        }
      }
    },
  });

  const time = computed({
    get: () => {
      if (!field.value) return null;
      const parsedDateTime = parseDateTime(field.value, format.value);
      return parsedDateTime?.isValid() ? parsedDateTime.format(defaultTimeFormat) : null;
    },
    set: (value) => {
      tempTime.value = value;
      if (tempDate.value) {
        const dateTime = moment(tempDate.value).format("YYYY-MM-DD") + " " + value;
        field.value = moment(dateTime).format(format.value);
      }
    },
  });

  const formattedDate = computed(() => {
    if (!field.value) return "";

    if (isMultiple.value && Array.isArray(field.value)) {
      if (field.value.length > 1) {
        if (props.options.datepicker.multiple === "range") {
          const [startDate, endDate] = [
            parseDateTime(field.value[0], dateFormat.value),
            parseDateTime(field.value[field.value.length - 1], dateFormat.value),
          ];
          return startDate?.isValid() && endDate?.isValid()
            ? `${startDate.format(displayFormat.value)} ~ ${endDate.format(
                displayFormat.value
              )}`
            : "";
        }
        return `${field.value.length} Selected`;
      }
      return formatDateTime(field.value[0], displayFormat.value);
    }

    return formatDateTime(field.value, displayFormat.value);
  });

  const formattedDateTime = computed(() => {
    if (!field.value) return "";
    return formatDateTime(field.value, displayFormat.value);
  });

  watch(field, () => parseDefaultValue(), { immediate: true });

  return {
    ..._useFieldType,
    tempDate,
    tempTime,
    date,
    time,
    formattedDate,
    formattedDateTime,
    defaultDateFormat,
    defaultTimeFormat,
    parseDefaultValue,
  };
}
