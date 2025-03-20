<template>
  <div class="mb-3">
    <label for="course" class="form-label">Course Code</label>
    <input
      type="text"
      class="form-control"
      id="course"
      v-model="formData.course"
      required
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        course: '',
        subject_with_code: '',
      },
    };
  },
  watch: {
    'formData.course'(newVal) {
      this.formData.subject_with_code = newVal;
    }
  },
};
</script> 