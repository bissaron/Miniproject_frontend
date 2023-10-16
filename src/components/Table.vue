<template>
  <v-data-table
    :headers="headers"
    :items="tracker"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>บันทึกรายรับรายจ่าย</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-dialog v-model="dialogaddTransaction" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="margin-left: 20px"
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              >เพิ่มข้อมูล</v-btn
            >
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-menu
                      v-model="menu"
                      offset-y
                      min-width="290px"
                      transition="scale-transition"
                      close-on-content-click
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.date"
                          label="วันที่"
                          append-icon="mdi-calendar"
                          readonly
                          v-on="on"
                          :rules="dataRules"
                          
                        >
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.date"
                        no-title
                        scrollable
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.amount"
                      label="จำนวน"
                      :rules="amountRules"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="editedItem.type"
                      :items="types"
                      label="ประเภท"
                      :rules="dataRules"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="editedItem.category"
                      :items="categories"
                      label="หมวดหมู่"
                      :rules="dataRules"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="รายละเอียด"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">ยกเลิก</v-btn>
              <v-btn color="blue darken-1" text @click="save">บันทึก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogdeleteTransaction" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 center-text">
              แน่ใจแล้วใช่ไหมที่จะลบรายการนี้?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >ยกเลิก</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >ตกลง</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-text style="margin-left: 50px">
        ยอดเงินคงเหลือ: {{ totalBalance }}
      </v-text>
      <v-text style="margin-left: 50px">
        รายรับทั้งหมด: {{ totalIncome }}
      </v-text>
      <v-text style="margin-left: 50px">
        รายจ่ายทั้งหมด: {{ totalExpense }}
      </v-text>
      <v-text style="margin-left: 50px">
        เงินออมทั้งหมด: {{ totalSavings }}
      </v-text>

    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import Tabs from "../components/Tabs.vue";
import Table from "../components/Table.vue";

export default {
  components: {
    Tabs,
    Table,
    
  },
  

  data: () => ({
    dataRules: [(v) => !!v || "กรุณากรอกข้อมูล"],
    amountRules: [
      (v) => !!v || "กรุณากรอกข้อมูล",
      (v) => !isNaN(parseFloat(v)) || "กรุณากรอกตัวเลขเท่านั้น",
    ],
    dialogaddTransaction: false,
    dialogdeleteTransaction: false,
    search: "",
    
    totalBalance: 0, // แต่งข้อมูลเพื่อรับค่า totalBalance
    totalIncome: 0, // แต่งข้อมูลเพื่อรับค่า totalIncome
    totalExpense: 0, // แต่งข้อมูลเพื่อรับค่า totalExpense
    totalSavings: 0, // แต่งข้อมูลเพื่อรับค่า totalSavings

    types: ["รายรับ", "รายจ่าย", "เงินออม"],
    categories: [
      "เงินเดือน",
      "ค่าอาหาร",
      "ค่าเดินทาง",
      "ค่าไฟ",
      "ค่าน้ำ",
      "ค่าอื่นๆ",
    ],
    menu: false,
    headers: [
      {
        text: "วันที่",
        align: "start",
        value: "date",
      },
      { text: "จำนวน", value: "amount" },
      { text: "ประเภท", value: "type", align: "start", width: "200px" },
      {
        text: "หมวดหมู่",
        value: "category",
        align: "start",
        width: "200px",
      },
      { text: "รายละเอียด", value: "description", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    tracker: [],
    editedIndex: -1,
    editedItem: {
      date: null,
      amount: "",
      description: "",
      type: "",
      category: "",
      balance: 0,
    },
    defaultItem: {
      date: null,
      amount: "",
      description: "",
      type: "",
      category: "",
      balance: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล";
    },

   
    totalBalance() {
      // คำนวณรายได้ทั้งหมด
      let totalIncome = this.tracker
        .filter((item) => item.type === "รายรับ")
        .reduce((total, item) => total + item.amount, 0);

      // คำนวณรายจ่ายทั้งหมด
      let totalExpense = this.tracker
        .filter((item) => item.type === "รายจ่าย")
        .reduce((total, item) => total + item.amount, 0);

      // คำนวณเงินออมทั้งหมด
      let totalSavings = this.tracker
        .filter((item) => item.type === "เงินออม")
        .reduce((total, item) => total + item.amount, 0);

      // คำนวณยอดเงินคงเหลือ
      let balance = totalIncome - totalExpense - totalSavings;

      return balance;
    },
    totalIncome() {
      return this.calculateTotal("รายรับ");
    },
    totalExpense() {
      return this.calculateTotal("รายจ่าย");
    },
    totalSavings() {
      return this.calculateTotal("เงินออม");
    },
  },

  watch: {
    dialogaddTransaction(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    tracker: {
      deep: true,
      handler: function (newTracker, oldTracker) {
        this.calculateTotals(newTracker);
      },
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.tracker = [
        {
          date: "2023-10-03",
          amount: 20000,
          description: 6.0,
          type: "รายรับ",
          category: 4.0,
        },

        {
          date: "2023-10-03",
          amount: 1000,
          description: 6.0,
          type: "รายจ่าย",
          category: 4.0,
        },
        {
          date: "2023-10-03",
          amount: 1000,
          description: 6.0,
          type: "เงินออม",
          category: 4.0,
        },
        {
          date: "2023-10-03",
          amount: 2000,
          description: 6.0,
          type: "เงินออม",
          category: 4.0,
        },
      ];
    },
    calculateTotal(type) {
      return this.tracker
        .filter((item) => item.type === type)
        .reduce((total, item) => total + item.amount, 0);
    },
    editItem(item) {
      this.editedIndex = this.tracker.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogaddTransaction = true;
    },

    deleteItem(item) {
      this.editedIndex = this.tracker.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogdeleteTransaction = true;
    },

    deleteItemConfirm() {
      this.tracker.splice(this.editedIndex, 1);

      this.closeDelete();
    },

    close() {
      if (this.menu) {
        this.menu = false;
      }
      this.dialogaddTransaction = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogdeleteTransaction = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    calculateTotals(tracker) {
      let totalIncome = 0;
      let totalExpense = 0;
      let totalSavings = 0;

      // Calculate totals
      for (const item of tracker) {
        if (item.type === "รายรับ") {
          totalIncome += item.amount;
        } else if (item.type === "รายจ่าย") {
          totalExpense += item.amount;
        } else if (item.type === "เงินออม") {
          totalSavings += item.amount;
        }
      }

      this.totalIncome = totalIncome;
      this.totalExpense = totalExpense;
      this.totalSavings = totalSavings;
      this.totalBalance = totalIncome - totalExpense - totalSavings;
    },
    save() {
      // ตรวจสอบว่าทุกข้อมูลถูกกรอกครบ
      if (
        this.editedItem.date &&
        this.editedItem.amount &&
        this.editedItem.type &&
        this.editedItem.category
      ) {
        this.editedItem.amount = parseFloat(this.editedItem.amount);

        if (this.editedIndex > -1) {
          Object.assign(this.tracker[this.editedIndex], this.editedItem);
        } else {
          this.tracker.push(this.editedItem);
        }

        this.close();
      } 
      
    },
  },
};
</script>
<style>
.center-text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>