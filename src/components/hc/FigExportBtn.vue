<template>
  <div>
    <div class="dropdown">
      <button
        class="btn btn-sm btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
      >
        下載
      </button>
      <ul class="dropdown-menu">
        <li>
          <a
            class="dropdown-item"
            style="cursor: pointer"
            @click="exportFig('png')"
            >下載 PNG 圖檔</a
          >
        </li>
        <li>
          <a
            class="dropdown-item"
            style="cursor: pointer"
            @click="exportFig('jpeg')"
            >下載 JPEG 圖檔</a
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a
            class="dropdown-item"
            style="cursor: pointer"
            @click="exportFig('full')"
            >圖片全幕</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";

exportingInit(Highcharts);
offlineExporting(Highcharts);

export default {
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    exportFig(choose) {
      const chart = Highcharts.charts
        .filter((e) => e !== undefined)
        .find((e) => e.userOptions.id === this.id);
      if (choose === "full") {
        chart.fullscreen.toggle();
      } else {
        chart.exportChartLocal({ type: `image/${choose}` });
      }
    },
  },
};
</script>
