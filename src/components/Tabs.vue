<template>
  <div>
    <v-card>
      <v-tabs v-model="tab" background-color="orange darken-2" dark>
        <v-tab @click="goToTab(item)" v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <router-view></router-view>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: 'หน้าแรก', content: 'Tab 1 Content' },
        { tab: 'จัดการตาราง', content: 'Tab 2 Content' },
        { tab: 'สิ่งที่อยากทำ', content: 'Tab 3 Content' },
        
      ]
    };
  },
  methods: {
  goToTab(item) {
    if (item.tab === 'จัดการตาราง') {
      this.$router.push({ name: 'manageTable' });
    }
    if (item.tab === 'หน้าแรก') {
      this.$router.push({ name: 'home' });
    }
    if (item.tab === 'สิ่งที่อยากทำ') {
      this.$router.push({ 
        name: 'todo',
        
       });
    }
  }
}
};
</script>
