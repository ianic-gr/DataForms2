<template>
  <div class="theme-fluid">
    <v-card>
      <v-card-title class="py-2">
        <span class="title_fluid" style="font-size: 1rem">{{ title }}</span>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <slot theme="Fluid" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ThemeFluid",
  props: {
    row: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    title() {
      return this.row?.title;
    },
  },
};
</script>

<style lang="scss">
.theme-fluid {
  margin-left: -10px;
  margin-bottom: -10px;

  .title_fluid {
    color: rgb(50, 49, 48);

    .theme--dark & {
      color: #d0d2d6;
    }
  }

  .v-input {
    margin-bottom: 1rem;

    .v-field {
      border-radius: 0 !important;
      margin-bottom: 0 !important;
    }

    &:not(.v-input--error) {
      .v-input__details {
        display: none !important;
      }
    }

    &:not(:hover) .v-field:not(.v-field--error):not(.v-field--focused) {
      .v-field__outline *,
      .v-field__outline__notch:before,
      .v-field__outline__notch:after {
        border-color: transparent !important;
      }
      input {
        font-weight: bolder;
      }
    }
  }

  .v-input__details {
    background-color: rgba(191, 9, 0, 0.075);
    padding: 0.75rem !important;
    font-weight: bold;
  }
}
</style>
