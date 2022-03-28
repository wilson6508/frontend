<template>
  <div>
    <div class="m-4">
      <div class="card">
        <h5 class="card-header">查詢面板</h5>
        <div class="card-body">
          <div class="row text-center">
            <div class="col-12 col-md-4">
              <span>查詢期間 : </span><br />
              <DatePicker
                class="mt-2"
                v-model="searchTime"
                type="date"
                range
                placeholder="選擇日期"
                :disabled-date="(date) => date > today"
              >
              </DatePicker>
            </div>
            <div class="col-12 col-md-4">
              <span>查詢項目 : </span>
              <select
                class="mt-2 form-select form-select-sm"
                aria-label="Default select example"
                v-model="selectedPrice"
              >
                <option selected value="close">close</option>
                <option value="open">open</option>
                <option value="low">low</option>
                <option value="high">high</option>
                <!-- <option value="volume">volume</option> -->
                <option value="fourPrice">單一股票(4價)</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <span>勾選代號 : </span><br />
              <div
                class="mt-2 form-check form-check-inline"
                v-for="item in checkBoxOptions"
                :key="item.id"
              >
                <input
                  v-if="selectedPrice === 'fourPrice'"
                  class="form-check-input"
                  type="radio"
                  :id="item.id"
                  :value="item"
                  v-model="radioSelected"
                />
                <input
                  v-else
                  class="form-check-input"
                  type="checkbox"
                  :id="item.id"
                  :value="item"
                  v-model="checkBoxSelected"
                />
                <label class="form-check-label" :for="item.id">{{
                  item.id
                }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-7">
          <div class="mt-4 card">
            <h5 class="card-header">圖形</h5>
            <div class="card-body">
              <FigContainer :figInfo="dayLineChart"></FigContainer>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5">
          <div class="mt-4 card">
            <h5 class="card-header">數據</h5>
            <div class="card-body">
              {{ searchTime }}
            </div>
          </div>
        </div>
      </div>
      <div class="card mt-4">
        <h5 class="card-header">統計分析</h5>
        <div class="card-body">123456</div>
      </div>
    </div>
    <pre v-show="false">{{ stockArr.length }}</pre>
  </div>
</template>

<script>
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/zh-cn";
import DatePicker from "vue2-datepicker";
import moment from "moment";
import FigContainer from "@/components/hc/FigContainer.vue";

export default {
  name: "UsaStock",
  components: {
    DatePicker,
    FigContainer,
  },
  mounted() {
    this.getStockArr();
  },
  computed: {
    stockArr() {
      let array = [];
      if (this.selectedPrice === "fourPrice") {
        array = this.allStockArr.filter(
          (e) => e.stockId === this.radioSelected.id
        );
      } else {
        const selectedId = this.checkBoxSelected.map((e) => e.id);
        array = this.allStockArr.filter((e) => selectedId.includes(e.stockId));
      }
      if (
        Array.isArray(this.searchTime) &&
        this.searchTime.length === 2 &&
        this.searchTime[0] !== null
      ) {
        const startDate = new Date(
          moment(this.searchTime[0]).format("YYYY-MM-DD")
        );
        const endDate = new Date(
          moment(this.searchTime[1]).format("YYYY-MM-DD")
        );
        array = array.filter((e) => {
          const target = new Date(e.date);
          return target >= startDate && target <= endDate;
        });
      }
      if (this.selectedPrice === "fourPrice") {
        this.singleStock(array);
      } else {
        this.multiStock(array, this.selectedPrice);
      }
      return array;
    },
  },
  watch: {
    allVisible() {
      this.dayLineChart.series.forEach((e) => (e.visible = true));
    },
  },
  data() {
    return {
      allStockArr: [],
      today: new Date(moment()),
      searchTime: "",
      selectedPrice: "fourPrice",
      radioSelected: { id: "AMAT", type: "company", nationality: "USA" },
      checkBoxSelected: [{ id: "AMAT", type: "company", nationality: "USA" }],
      checkBoxOptions: [
        { id: "AMAT", type: "company", nationality: "USA" },
        { id: "QQQM", type: "ETF", nationality: "USA" },
        { id: "SPY", type: "ETF", nationality: "USA" },
        { id: "VTI", type: "ETF", nationality: "USA" },
      ],
      dayLineChart: {
        chart: {
          type: "spline",
        },
        title: { text: "聲量統計-折線圖" },
        xAxis: {
          tickMarkPlacement: "on",
          tickInterval: 1,
          categories: ["2022-03-21", "2022-03-22", "2022-03-23"],
        },
        yAxis: {
          title: {
            text: "USD",
          },
        },
        series: [
          {
            name: "open",
            data: [
              {
                y: 134.1,
              },
              {
                y: 134,
              },
              {
                y: 133.61,
              },
            ],
            color: "#ec5145",
            visible: true,
          },
          {
            name: "high",
            data: [
              {
                y: 135.38,
              },
              {
                y: 137.34,
              },
              {
                y: 135.1,
              },
            ],
            color: "#f18a2f",
            visible: true,
          },
          {
            name: "low",
            data: [
              {
                y: 131.92,
              },
              {
                y: 133.85,
              },
              {
                y: 131.2,
              },
            ],
            visible: true,
          },
        ],
        tooltip: {
          headerFormat: "<b>{series.name}</b><br>{point.key}<br>",
          pointFormat: "{point.y} USD",
        },
        plotOptions: {
          series: {
            marker: {
              enabled: true, // 顯示節點
            },
            dataLabels: {
              enabled: true, // 顯示數據
            },
          },
        },
      },
      allVisible: true,
      colorMapping: new Map([
        ["AMAT", "#dc3545"],
        ["QQQM", "#434348"],
        ["SPY", "#f7a35c"],
        ["VTI", "#0a58ca"],
      ]),
    };
  },
  methods: {
    async getStockArr() {
      const apiUrl = "http://127.0.0.1:8087/databaseApi/normal";
      const postBody = { moduleName: "stock_read_usa_price_log" };
      const response = await this.postApi(apiUrl, postBody);
      this.allStockArr = response.result;
    },
    singleStock(result) {
      const dateArr = result.map((e) => e.date);
      const open = {
        name: "open",
        color: "#dc3545",
        data: result.map((e) => e.open),
      };
      const high = {
        name: "high",
        color: "#434348",
        data: result.map((e) => e.high),
      };
      const low = {
        name: "low",
        color: "#f7a35c",
        data: result.map((e) => e.low),
      };
      const close = {
        name: "close",
        color: "#0a58ca",
        data: result.map((e) => e.close),
      };
      this.dayLineChart.xAxis.categories = dateArr;
      this.dayLineChart.series = [open, high, low, close];
      this.allVisible = true;
    },
    multiStock(result, price) {
      const myMap = new Map();
      for (const item of result) {
        if (myMap.has(item.stockId)) {
          myMap.get(item.stockId).push(item);
        } else {
          myMap.set(item.stockId, [item]);
        }
      }
      const iterator = myMap.keys();
      const firstKey = iterator.next().value;
      const dateArr = myMap.get(firstKey).map((e) => e.date);
      const dataArr = [];
      for (const [key, value] of myMap) {
        dataArr.push({
          name: key,
          color: this.colorMapping.get(key),
          data: value.map((e) => {
            return { y: e[price] };
          }),
        });
      }
      this.dayLineChart.xAxis.categories = dateArr;
      this.dayLineChart.series = dataArr;
      this.allVisible = false;
    },
  },
};
</script>
