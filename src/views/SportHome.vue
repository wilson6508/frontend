<template>
  <div>
    <div class="m-4">
      <div class="row">
        <div class="col-12 col-md-8"></div>
        <div class="col-12 col-md-4">
          <div class="card">
            <h5 class="card-header">查詢面板</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <select class="form-select" v-model="selectedLeague">
                    <option
                      v-for="(item, index) in leagues"
                      :key="index"
                      :value="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="col-5">
                  <select class="form-select" v-model="selectDay">
                    <option value="today">today</option>
                    <option value="tomorrow">tomorrow</option>
                  </select>
                </div>
                <div class="col-2">
                  <button class="btn btn-primary">查詢</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <h5 class="card-header">查詢面板</h5>
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- <button class="btn btn-dark" @click="getSpreads">spreads</button>
      <button class="btn btn-primary" @click="getOdds">odds</button>
      <pre>{{ table }}</pre> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLeague: "MLB",
      leagues: ["MLB", "NPB", "CPBL", "KBO"],
      selectDay: "tomorrow",
    };
  },
  methods: {
    async getSpreads() {
      const apiUrl = "http://127.0.0.1:8086/crawlerApi/normal";
      const postBody = {
        moduleName: "sport_crawl_spreads",
        parameter: "kbl;today",
      };
      const response = await this.postApi(apiUrl, postBody);
      this.table = response;
    },
    async getOdds() {
      const apiUrl = "http://127.0.0.1:8086/crawlerApi/normal";
      const postBody = {
        moduleName: "sport_crawl_odds",
        parameter: "kbl;today",
      };
      const response = await this.postApi(apiUrl, postBody);
      this.table = response;
    },
  },
};
</script>
