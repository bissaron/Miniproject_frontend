<template>
  <v-container style="max-width: 500px" items="newTask">
    <v-text-field
      v-model="newTask"
      label="สิ่งที่คุณอยากทำคือ?"
      solo
      @keydown.enter="create"
    >
      <template v-slot:append>
        <v-fade-transition>
          <v-icon v-if="newTask" @click="create"> mdi-plus-circle </v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>

    <h2 class="text-h5 success--text pl-4">
      รายการที่อยากทำ:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-2">
        ราการที่เหลือ: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        สำเร็จแล้ว: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition class="py-0" group tag="v-list">
        <template v-for="(task, i) in tasks">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-item :key="`${i}-${task.text}`">
            <v-list-item-action>
              <v-checkbox
                v-model="task.done"
                :color="(task.done && 'grey') || 'primary'"
              >
                <template v-slot:label>
                  <div
                    :class="(task.done && 'grey--text') || 'primary--text'"
                    class="ml-4"
                    v-text="task.text"
                  ></div>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon v-if="task.done" color="success"> mdi-check </v-icon>
            </v-scroll-x-transition>

            <v-icon @click="deleteTask(i)" color="error" class="mr-3">
              mdi-delete
            </v-icon>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    tasks: [
      {
        done: false,
        text: "การบ้านวิชาคณิต 12/2/2065",
      },
      {
        done: false,
        text: "ไปเที่ยวภูเก็ต",
      },
    ],
    

    newTask: null,
  }),

 
  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },
  created() {
  this.initialize();
},

  methods: {
    async initialize() {
    this.newTask = [];
      try {
        var data = await this.axios.get("http://localhost:9000/todo");
        console.log("data todo ====>", data);
        this.newTask = data.data;
      } catch (error) {}
    },
    create() {
      this.tasks.push({
        done: false,
        text: this.newTask,
      });

      this.newTask = null;
    },
    deleteTask(index) {
      // ลบรายการที่เลือกด้วย index
      this.tasks.splice(index, 1);
    },
  },
};
</script>
