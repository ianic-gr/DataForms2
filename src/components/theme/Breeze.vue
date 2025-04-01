<template>
  <div class="theme-breeze" v-bind="row?.options">
    <slot theme="Breeze" />
  </div>
</template>

<script>
export default {
  name: "ThemeBreeze",
  props: {
    row: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
.theme-breeze {
  label {
    color: #7e7e7e;
    font-size: 0.75rem;
  }

  .input-field {
    padding-top: 0 !important;
  }

  .v-text-field__details {
    margin-bottom: 0px !important;
  }

  .v-input__slot,
  .v-messages {
    margin-bottom: 3px !important;
  }

  .v-text-field > .v-input__control > .v-input__slot {
    min-height: 50px !important;
  }

  .v-input {
    .v-field:not(.v-field--error):not(.v-field--focused) {
      .v-field__outline *,
      .v-field__outline__notch:before,
      .v-field__outline__notch:after {
        border-color: transparent !important;
      }
    }

    .v-field {
      border-radius: 7px !important;
      background: #f2f1f6;
    }
  }
}

button[type="submit"].breeze {
  border-radius: 7px;
  padding: 22px !important;
  color: white;
  background: rgb(0, 65, 235) !important;

  &::before {
    background: linear-gradient(
      270deg,
      rgba(0, 65, 235, 1) 15%,
      rgba(0, 212, 255, 1) 100%
    );
    opacity: 1;
  }

  //   &:hover {
  //     background: linear-gradient(
  //       270deg,
  //       rgba(0, 65, 235, 1) 50%,
  //       rgba(0, 212, 255, 1) 100%
  //     );
  //   }

  //   &:active {
  //     background: linear-gradient(
  //       270deg,
  //       rgba(0, 65, 235, 1) 100%,
  //       rgba(0, 212, 255, 1) 100%
  //     );
  //   }
}
</style>
