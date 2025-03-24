import { ref, computed, onMounted } from "vue";
import { useFieldType } from "@/composables/useFieldType";
import moment from "moment";

export function useDateTimeFieldType(props) {
  const _useFieldType = useFieldType(props);
  const { field } = _useFieldType;

  const tempDate = ref("");
  const tempTime = ref("");
  const defaultDateFormat = "MM-DD-YYYY";
  const defaultTimeFormat = "HH:mm";

  const parseDefaultValue = () => {
    if (!props.input.options.default) return;

    const format = props.options?.returnFormat ?? `${defaultDateFormat} ${defaultTimeFormat}`;
    const defaultVal = props.input.options.default;

    if (props.input.type === "dateTimePicker") {
      const parsedDateTime = moment(defaultVal, format);
      if (parsedDateTime.isValid()) {
        field.value = parsedDateTime.format(format);
        tempDate.value = parsedDateTime.toDate();
        tempTime.value = parsedDateTime.format(defaultTimeFormat);
      }
    } else if (isMultiple.value) {
      if (Array.isArray(defaultVal)) {
        const validDates = defaultVal
          .map((val) => {
            const parsedDate = moment(val, format);
            return parsedDate.isValid() ? parsedDate.format(format) : null;
          })
          .filter(Boolean);
        
        field.value = validDates;
        tempDate.value = validDates.map(date => moment(date, format).toDate());
      }
    } else {
      const parsedDate = moment(defaultVal, format);
      if (parsedDate.isValid()) {
        field.value = parsedDate.format(format);
        tempDate.value = parsedDate.toDate();
      }
    }
  };

  onMounted(() => {
    parseDefaultValue();
  });

  const date = computed({
    get: () => {
      const format = props.options?.returnFormat?.split(" ")[0] ?? defaultDateFormat;
      const fieldValue = tempDate.value ?? field.value;
      
      if (!fieldValue) return null;

      let returnValue;
      if (isMultiple.value && Array.isArray(fieldValue)) {
        returnValue = fieldValue.map((val) => {
          if (val instanceof Date) return val;
          const parsedDate = moment(val, format);
          return parsedDate.isValid() ? parsedDate.toDate() : null;
        }).filter(Boolean);
      } else {
        if (fieldValue instanceof Date) return fieldValue;
        const parsedDate = moment(fieldValue, format);
        returnValue = parsedDate.isValid() ? parsedDate.toDate() : null;
      }

      return returnValue;
    },
    set: (value) => {
      const format = props.options?.returnFormat ?? defaultDateFormat;

      if (!value) {
        tempDate.value = "";
        field.value = "";
        return;
      }

      if (isMultiple.value && Array.isArray(value)) {
        tempDate.value = value;
        field.value = value.map(val => moment(val).format(format));
      } else {
        tempDate.value = value;
        if (props.input.type === "dateTimePicker" && tempTime.value) {
          const dateTime = moment(value).format("YYYY-MM-DD") + " " + tempTime.value;
          field.value = moment(dateTime).format(format);
        } else {
          field.value = moment(value).format(format);
        }
      }
    },
  });

  const time = computed({
    get: () => {
      const preFormat = props.options?.returnFormat ?? `${defaultDateFormat} ${defaultTimeFormat}`;
      const fieldValue = field.value;

      if (!fieldValue) return null;

      const parsedDateTime = moment(fieldValue, preFormat);
      return parsedDateTime.isValid() ? parsedDateTime.format(defaultTimeFormat) : null;
    },
    set: (value) => {
      tempTime.value = value;
      if (tempDate.value) {
        const format = props.options?.returnFormat ?? `${defaultDateFormat} ${defaultTimeFormat}`;
        const dateTime = moment(tempDate.value).format("YYYY-MM-DD") + " " + value;
        field.value = moment(dateTime).format(format);
      }
    },
  });

  const formattedDate = computed(() => {
    const format = props.options?.format ?? defaultDateFormat;
    const returnFormat = props.options?.returnFormat?.split(" ")[0] ?? defaultDateFormat;
    const fieldValue = field.value;

    if (!fieldValue) return "";

    let returnValue;
    if (isMultiple.value && Array.isArray(fieldValue)) {
      if (fieldValue.length > 1) {
        if (props.options.datepicker.multiple === "range") {
          const startDate = moment(fieldValue[0], returnFormat);
          const endDate = moment(fieldValue[fieldValue.length - 1], returnFormat);
          returnValue =
            startDate.isValid() && endDate.isValid()
              ? `${startDate.format(format)} ~ ${endDate.format(format)}`
              : "";
        } else {
          returnValue = `${fieldValue.length} Selected`;
        }
      } else {
        const parsedDate = moment(fieldValue[0], returnFormat);
        returnValue = parsedDate.isValid() ? parsedDate.format(format) : "";
      }
    } else {
      const parsedDate = moment(fieldValue, returnFormat);
      returnValue = parsedDate.isValid() ? parsedDate.format(format) : "";
    }

    return returnValue;
  });

  const formattedDateTime = computed(() => {
    const format = props.options?.format ?? `${defaultDateFormat} ${defaultTimeFormat}`;
    const fieldValue = field.value;

    if (!fieldValue) return "";

    const parsedDateTime = moment(fieldValue);
    return parsedDateTime.isValid() ? parsedDateTime.format(format) : "";
  });

  const isMultiple = computed(() => {
    return (
      props.input.type === "datepicker" &&
      props.options?.datepicker &&
      "multiple" in props.options.datepicker
    );
  });

  const shell = {
    ..._useFieldType,
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
