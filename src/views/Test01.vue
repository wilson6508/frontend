<template>
  <div>
    <div class="container sidebar" :style="`width: ${too ? 200 : 0}px`"></div>
    <div class="m-5">
      <button class="btn btn-primary" @click="test01()">test01</button
      ><br /><br />
      <button class="btn btn-primary" @click="test02()">test02</button
      ><br /><br />
      <button class="btn btn-primary" @click="test03()">test03</button
      ><br /><br />
      <button class="btn btn-primary" @click="test04()">test04</button
      ><br /><br />
      <button class="float-end btn btn-primary" @click="test05()">test05</button
      ><br /><br />
      <pre>{{ tableData }}</pre>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  position: fixed;
  /*z-index: 1;*/
  top: 0;
  /*left: 0;*/
  background-color: #111;
  /*overflow-x: hidden;*/
  transition: 0.5s;
  margin-top: 60px;
  /*padding-top: 60px;*/
}
</style>

<script>
export default {
  data() {
    return {
      too: true,
      tableData: [],
    };
  },
  methods: {
    async test01() {
      const apiUrl = "http://127.0.0.1:8086/hello";
      const postBody = { moduleName: "qqq" };
      const result = await this.postApi(apiUrl, postBody);
      console.log(result);
    },
    async test02() {
      const apiUrl = "http://127.0.0.1:8086/crawlerApi/normal";
      const postBody = { moduleName: "delete_stock_info" };
      const result = await this.postApi(apiUrl, postBody);
      console.log(result);
    },
    async test03() {
      const apiUrl =
        "https://script.google.com/macros/s/AKfycbz_zhyNeEPxyfndm9YwknPl90If0jJhS3MaE6bdR-lQUDC5k9OuCAK0jaKY-1csUi6h/exec";
      const postBody = JSON.stringify({
        url: "https://mis.twse.com.tw/stock/data/all_etf.txt?1632842984044&_=1632842983379",
      });
      const result = await this.postApi(apiUrl, postBody);
      console.log(result);
    },
    async test04() {
      const apiUrl = "http://127.0.0.1:8087/databaseApi/normal";
      const postBody = { moduleName: "read_usa_stock_price_log" };
      const response = await this.postApi(apiUrl, postBody);
      this.tableData = response.result.filter((e) => e.stockId === "AMAT");
    },
    test05() {
      this.too = !this.too;
    },
  },
};
</script>
