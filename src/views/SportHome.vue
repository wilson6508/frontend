<template>
  <div>
    <div class="m-4">
      <div class="row">
        <div class="col-12 col-md-9"></div>
        <div class="col-12 col-md-3">
          <div class="card">
            <h5 class="card-header">查詢面板</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-8">
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
                <div class="col-4">
                  <button class="btn btn-dark" @click="getSpreads">
                    查詢盤口
                  </button>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-8">
                  <select class="form-select" v-model="selectDay">
                    <option value="today">today</option>
                    <option value="tomorrow">tomorrow</option>
                  </select>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary" @click="getOdds">
                    查詢賠率
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <button class="btn btn-success" @click="spreadsArrIndex--">
            pre
          </button>
          {{ spreadsArrIndex }}
          <button class="btn btn-success" @click="spreadsArrIndex++">
            next
          </button>
          <pre>{{ showSpreadsArr }}</pre>
        </div>
        <div class="col-6">
          <button class="btn btn-success" @click="totalsArrIndex--">pre</button>
          {{ totalsArrIndex }}
          <button class="btn btn-success" @click="totalsArrIndex++">
            next
          </button>
          <pre>{{ showTotalsArr }}</pre>
        </div>
      </div>

      <div v-show="false" class="card mt-4">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLeague: "NBA",
      leagues: ["MLB", "NPB", "CPBL", "KBO", "NBA", "KBL"],
      selectDay: "tomorrow",
      spreadsArr: [],
      spreadsArrIndex: 0,
      totalsArr: [],
      totalsArrIndex: 0,
      oddsArr: [],
    };
  },
  computed: {
    parameter() {
      return this.selectedLeague + ";" + this.selectDay;
    },
    showSpreadsArr() {
      if (this.spreadsArr.length > 0) {
        return this.spreadsArr[this.spreadsArrIndex];
      }
      return [];
    },
    showTotalsArr() {
      if (this.totalsArr.length > 0) {
        return this.totalsArr[this.totalsArrIndex];
      }
      return [];
    },
  },
  methods: {
    async getSpreads() {
      const apiUrl = "http://127.0.0.1:8086/crawlerApi/normal";
      const postBody = {
        moduleName: "sport_crawl_spreads",
        parameter: this.parameter,
      };
      const response = await this.postApi(apiUrl, postBody);
      this.spreadsArr = response.result;
      this.totalsArr = response.extraInfo;
    },
    async getOdds() {
      const apiUrl = "http://127.0.0.1:8086/crawlerApi/normal";
      const postBody = {
        moduleName: "sport_crawl_odds",
        parameter: this.parameter,
      };
      const response = await this.postApi(apiUrl, postBody);
      this.oddsArr = response;
    },
  },
};
</script>
