<script setup>
const result = ref(null);

const api = {
  rows: [
    {
      tabs: {
        options: { header: "Επεξεργασία υδρομέτρου" },
        items: [
          {
            title: "Οντότητα",
            inputGroups: [
              {
                title: "Βασικές Πληροφορίες Οντότητας",
                input: [
                  {
                    name: {
                      options: { label: "Όνομα", disabled: false, clearable: true },
                      readOnly: false,
                      visible: true,
                      type: "text-field",
                    },
                    description: {
                      options: { label: "Περιγραφή", disabled: false, clearable: true },
                      readOnly: false,
                      visible: true,
                      type: "text-field",
                    },
                    comments: {
                      options: { label: "Σχόλια", disabled: false, clearable: true },
                      readOnly: false,
                      visible: true,
                      type: "text-field",
                    },
                    created_at: {
                      options: {
                        label: "Ημερομηνία Δημιουργίας",
                        disabled: true,
                        clearable: true,
                        default: "2025-06-30T13:16:24.986+00:00",
                        format: "DD/MM/YYYY",
                        returnFormat: "YYYY-MM-DDTHH:mm:ss.SSSZ",
                      },
                      readOnly: true,
                      visible: true,
                      type: "datepicker",
                    },
                    updated_at: {
                      options: {
                        label: "Ημερομηνία Τελευταίας Επεξεργασίας",
                        disabled: true,
                        clearable: true,
                        default: "2025-07-14T14:43:44.187+00:00",
                        format: "DD/MM/YYYY",
                        returnFormat: "YYYY-MM-DDTHH:mm:ss.SSSZ",
                      },
                      readOnly: true,
                      visible: true,
                      type: "datepicker",
                    },
                    last_updated_user: {
                      options: {
                        label: "Χρήστης τελευταίας επεξεργασίας",
                        disabled: true,
                        clearable: true,
                        default: "tachos",
                      },
                      readOnly: true,
                      visible: true,
                      type: "text-field",
                    },
                  },
                ],
                options: { variant: "flat" },
              },
              {
                title: "Πληροφορίες Υδρομέτρου",
                input: [
                  {
                    client_serial_number: {
                      options: {
                        label: "Σειριακός Αριθμός Πελάτη",
                        disabled: false,
                        clearable: true,
                        default: "07417199",
                      },
                      readOnly: false,
                      visible: true,
                      type: "text-field",
                      validation: "required",
                    },
                    serial_number: {
                      options: {
                        label: "Σειριακός Αριθμός",
                        disabled: false,
                        clearable: true,
                        default: "07417199",
                      },
                      readOnly: false,
                      visible: true,
                      type: "text-field",
                      validation: "required",
                    },
                    manufacturer: {
                      options: {
                        label: "Κατασκευαστής",
                        disabled: false,
                        clearable: true,
                        default: "Axioma",
                      },
                      readOnly: false,
                      visible: true,
                      type: "text-field",
                      validation: "required",
                    },
                    model: {
                      options: {
                        label: "Μοντέλο",
                        disabled: false,
                        clearable: true,
                        default: "Qalcosonic W1",
                      },
                      readOnly: false,
                      visible: true,
                      type: "text-field",
                    },
                    manufactured_date: {
                      options: {
                        label: "Ημερομηνία Κατασκευής",
                        disabled: false,
                        clearable: true,
                        format: "DD/MM/YYYY",
                        returnFormat: "YYYY-MM-DDTHH:mm:ss.SSSZ",
                      },
                      readOnly: false,
                      visible: true,
                      type: "datepicker",
                    },
                    state: {
                      options: {
                        label: "Κατάσταση",
                        disabled: true,
                        clearable: true,
                        default: "warehouse",
                      },
                      readOnly: true,
                      visible: true,
                      type: "text-field",
                    },
                    device_type: {
                      options: {
                        label: "Τύπος Μετρητή",
                        disabled: false,
                        clearable: true,
                        default: "digital",
                        multiple: false,
                        chips: true,
                        closableChips: false,
                        items: [
                          { title: "digital", value: "digital" },
                          { title: "analog", value: "analog" },
                        ],
                      },
                      readOnly: false,
                      visible: true,
                      type: "autocomplete",
                      validation: "required",
                    },
                    diameter: {
                      options: {
                        label: "Διάμετρος",
                        disabled: false,
                        clearable: true,
                        default: "DN15",
                      },
                      readOnly: false,
                      visible: true,
                      type: "text-field",
                    },
                    length: {
                      options: {
                        label: "Μήκος",
                        disabled: false,
                        clearable: true,
                        default: 110,
                        precision: null,
                      },
                      readOnly: false,
                      visible: true,
                      type: "number-input",
                    },
                  },
                ],
                options: { variant: "flat" },
              },
            ],
          },
          {
            title: "Προφίλ Υδρομέτρου",
            inputGroups: [
              {
                title: "Προφίλ Υδρομέτρου",
                options: { variant: "flat" },
                dynamic: {
                  item: {
                    guid: "3b343951-a60b-406b-adf3-0d94041a133c",
                    entity_ref: "*_device_profile",
                    images: [],
                    entity_name: "*_device_profiles",
                    actions: "r",
                    order: 1,
                    defaultName: "Device Profiles",
                    alias: { el: "Προφίλ Υδρομέτρου", en: "Device Profiles" },
                    component: "HydrometerProfiles",
                    fields: [],
                  },
                  component: {
                    __name: "HydrometerProfiles",
                    __hmrId: "22e47e82",
                    __file:
                      "/home/dianic/Desktop/Ianic/balloon-works-frontend/components/entities/form/components/HydrometerProfiles.vue",
                  },
                  tab: {
                    guid: "b9e10043-6984-4fe1-896d-2765728fa7e1",
                    defaultName: "Device Profiles",
                    alias: { el: "Προφίλ Υδρομέτρου", en: "Device Profiles" },
                    conditions: {},
                    searchCriteria: {},
                    items: [
                      {
                        guid: "3b343951-a60b-406b-adf3-0d94041a133c",
                        entity_ref: "*_device_profile",
                        images: [],
                        entity_name: "*_device_profiles",
                        actions: "r",
                        order: 1,
                        defaultName: "Device Profiles",
                        alias: { el: "Προφίλ Υδρομέτρου", en: "Device Profiles" },
                        component: "HydrometerProfiles",
                        fields: [],
                      },
                    ],
                  },
                  entityData: {},
                  fields: [{}],
                },
              },
            ],
          },
        ],
      },
    },
  ],
  submit: {
    options: { text: "Αποθήκευση", disabled: false, color: "primary", flat: true },
  },
};
</script>

<template>
  <DataForm id="checks-radios" :api="api" />
  <div v-if="result" class="mt-4">
    <h3>Result:</h3>
    {{ result }}
  </div>
</template>
