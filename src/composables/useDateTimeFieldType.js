import { ref, computed } from "vue";
import { useFieldType } from "@/composables/useFieldType";
import moment from "moment";

export function useDateTimeFieldType(props) {
  const _useFieldType = useFieldType(props);
  const { field } = _useFieldType;

  const tempDate = ref(null);
  const tempTime = ref(null);
  const defaultDateFormat = "MM-DD-YYYY";
  const defaultTimeFormat = "HH:mm";

  const date = computed({
    get: () => {
      const format =
        props.options?.returnFormat?.split(" ")[0] ?? defaultDateFormat;
      const fieldValue = tempDate.value ?? field.value;
      let returnValue;

      if (isMultiple.value && fieldValue.length) {
        returnValue = fieldValue.map(
          (val) => new Date(moment(val, format).format())
        );
      } else {
        returnValue = new Date(moment(fieldValue, format).format());
      }

      return returnValue;
    },
    set: (value) => {
      const format = props.options?.returnFormat ?? defaultDateFormat;

      if (isMultiple.value && value.length) {
        tempDate.value = value.map((val) => moment(val).format(format));
      } else {
        tempDate.value = moment(value).format(format);
      }
    },
  });

  const time = computed({
    get: () => {
      const preFormat =
        props.options?.returnFormat ??
        `${defaultDateFormat} ${defaultTimeFormat}`;

      return (
        tempTime.value ??
        moment(field.value, preFormat).format(defaultTimeFormat)
      );
    },
    set: (value) => {
      tempTime.value = value;
    },
  });

  const formattedDate = computed(() => {
    const format = props.options?.format ?? defaultDateFormat;
    const returnFormat =
      props.options?.returnFormat?.split(" ")[0] ?? defaultDateFormat;

    let returnValue;

    if (isMultiple.value && field.value.length) {
      returnValue = field.value.map((val) =>
        moment(val, returnFormat).format(format)
      );

      if (field.value.length > 1) {
        returnValue = `${field.value.length} Selected`;

        if (props.options.datepicker.multiple === "range") {
          returnValue = [
            moment(field.value[0], returnFormat).format(format),
            moment(field.value[field.value.length - 1], returnFormat).format(
              format
            ),
          ].join(" ~ ");
        }
      }
    } else {
      returnValue = field.value
        ? moment(field.value, returnFormat).format(format)
        : "";
    }

    return returnValue;
  });

  const formattedDateTime = computed(() => {
    const format =
      props.options?.format ?? `${defaultDateFormat} ${defaultTimeFormat}`;

    return moment(field.value).format(format);
  });

  const isMultiple = computed(() => {
    return (
      props.input.type === "datepicker" &&
      props.options?.datepicker &&
      "multiple" in props.options.datepicker
    );
  });

  const shell = {
    // Return FieldType composable
    ..._useFieldType,
    // Temp values will be convert to field value
    tempDate,
    tempTime,
    date,
    time,
    formattedDate,
    formattedDateTime,
    defaultDateFormat,
    defaultTimeFormat,
  };

  return shell;
}
