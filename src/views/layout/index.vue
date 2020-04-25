<template>
  <div :class="{ navCollapsed: isSidebarNavCollapse }">
    123
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isSidebarNavCollapse"])
  }
};
</script>
