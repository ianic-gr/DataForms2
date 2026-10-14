<script setup>
  import moment from "moment";
  import { useDateTimeFieldType } from "@/composables/useDateTimeFieldType";
  import { useField } from "vee-validate";

  defineOptions({ inheritAttrs: false });

  const props = defineProps({
    input: {
      type: Object,
      default: () => ({}),
    },
    inputKey: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    formId: {
      required: true,
      type: String,
    },
    events: {
      type: Object,
      default: () => ({}),
    },
  });

  const { value: inputModel, errorMessage } = useField(props.inputKey, !props.input.readOnly ? props.input.validation : "", {
    initialValue: props.options.default,
  });

  const { field, currentFormData, date, time, formattedDateTime, defaultDateFormat, defaultTimeFormat } =
    useDateTimeFieldType(props);

  const fieldReturn = defineModel("return");

  const dialog = ref(false);
  const pickerTab = ref("date");

  const returnFormat = computed(() => props.options?.returnFormat ?? `${defaultDateFormat} ${defaultTimeFormat}`);

  let snapshot = "";
  watch(dialog, (open) => {
    if (open) snapshot = field.value ?? "";
  });

  const cancel = () => {
    field.value = snapshot;
    dialog.value = false;
  };

  const saveDate = () => {
    if (date.value) {
      const datePart = moment(date.value).format(defaultDateFormat);
      const timePart = time.value ?? "00:00";

      field.value = moment(`${datePart} ${timePart}`, `${defaultDateFormat} ${defaultTimeFormat}`).format(
        returnFormat.value
      );
    }
    dialog.value = false;
  };

  const clear = () => {
    date.value = null;
    time.value = null;
  };

  watch(
    field,
    (v) => {
      if (v === null) return;

      const formatted = formattedDateTime.value ?? "";

      if (formatted === fieldReturn.value && formatted === inputModel.value) return;

      inputModel.value = formatted;
      fieldReturn.value = formatted;
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <v-text-field
      :model-value="formattedDateTime"
      v-bind="{ ...$attrs, ...options }"
      readonly
      :error-messages="errorMessage"
      @click:clear="clear"
      @click="events?.onClick && events.onClick()"
    />
    <v-dialog v-model="dialog" max-width="360" persistent activator="parent" :disabled="!!$attrs.disabled">
      <template #default>
        <v-card>
          <v-card-text class="pa-0">
            <v-tabs v-model="pickerTab" dark grow>
              <v-tab value="date"> DATE </v-tab>
              <v-tab value="time"> TIME </v-tab>
            </v-tabs>
            <v-tabs-window v-model="pickerTab">
              <v-tabs-window-item value="date">
                <v-date-picker
                  v-model="date"
                  v-bind="options?.datepicker"
                  :locale="currentFormData?.locale"
                  :multiple="false"
                  width="auto"
                />
              </v-tabs-window-item>
              <v-tabs-window-item value="time">
                <v-time-picker v-model="time" width="auto" />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
          <v-spacer />
          <v-card-actions>
            <v-btn :text="$t('$dataforms.global.cancel')" color="primary" @click="cancel" />
            <v-btn :text="$t('$dataforms.global.submit')" color="primary" @click="saveDate" />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
