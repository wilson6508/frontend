<template>
  <div>
    <div class="m-4">
      <div class="card">
        <h5 class="card-header">Card</h5>
        <div class="card-body">
          <div class="row text-center">
            <div class="col-12 col-md-4">
              <span>123456 : </span><br />
              <DatePicker
                class="mt-2"
                v-model="value1"
                type="date"
                range
                placeholder="Select date range"
                :disabled-date="(date) => date > today"
              >
              </DatePicker>
            </div>
            <div class="col-12 col-md-4">
              <span>123456 : </span>
              <select
                class="mt-2 form-select form-select-sm"
                aria-label="Default select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">close</option>
                <option value="2">open</option>
                <option value="3">low</option>
                <option value="4">high</option>
                <option value="5">volume</option>
                <option value="6">something</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <span>123456 : </span><br />
              <div
                class="mt-2 form-check form-check-inline"
                v-for="item in checkBoxOptions"
                :key="item.id"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="item.id"
                  :value="item.value"
                  v-model="checkBoxSelected"
                />
                <label class="form-check-label" :for="item.id">{{
                  item.label
                }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-7">
          <div class="mt-4 card">
            <h5 class="card-header">Card</h5>
            <div class="card-body">
              {{ checkBoxSelected }}
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5">
          <div class="mt-4 card">
            <h5 class="card-header text-center">Card</h5>
            <div class="card-body">
              {{ today }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/zh-cn";
import DatePicker from "vue2-datepicker";
import moment from "moment";

export default {
  name: "Test02",
  components: {
    DatePicker,
  },
  data() {
    return {
      value1: "",
      today: new Date(moment()),
      checkBoxSelected: [],
      checkBoxOptions: [
        { id: "inlineCheckbox1", value: "option1", label: "option1" },
        { id: "inlineCheckbox2", value: "option2", label: "option2" },
        { id: "inlineCheckbox3", value: "option3", label: "option3" },
        { id: "inlineCheckbox4", value: "option4", label: "option4" },
      ],
    };
  },
  methods: {},
};
</script>
