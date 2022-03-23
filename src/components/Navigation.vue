<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="d-flex justify-content-start">
        <div class="mt-2 mb-1 text-light">
          <!-- <button class="ms-3 btn btn-dark btn-sm" data-bs-toggle="collapse" data-bs-target="#collapseExample">
            <span class="material-icons-outlined">menu</span>
          </button> -->
          <a
            class="ms-3 navbar-brand"
            style="cursor: pointer"
            @click="move('/')"
            >Home</a
          >
          <a
            class="ms-3 navbar-brand"
            style="cursor: pointer"
            @click="move('/about')"
            >About</a
          >
          <a
            class="ms-3 navbar-brand"
            style="cursor: pointer"
            @click="move('/test01')"
            >Test01</a
          >
          <a
            class="ms-3 navbar-brand"
            style="cursor: pointer"
            @click="move('/test02')"
            >Test02</a
          >
        </div>
      </div>
    </nav>
    <!-- <div class="collapse" id="collapseExample">
      <div class="bg-dark">
        <h5 class="text-light">Dark card title</h5>
        <p class="text-light">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Navigation",
  methods: {
    move(url) {
      const pathname = new URL(location.href).pathname;
      if (url !== pathname) {
        this.$router.push(url);
      }
    },
  },
};
</script>
