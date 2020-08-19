<template>
  <div
    :class="
      klasa == 'true'
        ? 'snackbar_info snackbar_info_open'
        : 'snackbar_info snackbar_info_closed'
    "
  >
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ['text', 'klasa'],
};
</script>

<style scoped>
.snackbar_info {
  position: fixed;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  padding: 10px 15px;
  font-size: 1rem;
  color: #fafaff;
  background: #424242;
  border-radius: 8px;
  transition: opacity 0.3s linear;
}

.snackbar_info_open {
  opacity: 1;
}

.snackbar_info_closed {
  opacity: 0;
}
</style>
