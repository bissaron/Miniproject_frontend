<template>
    <v-container>
      <v-row>
          <v-col cols="12">
           <Table/>
           
          </v-col>
      </v-row>
    </v-container>
    
  </template>
  
  <script>
  export default {
      components: {
          Table: () => import('../components/Table.vue')
      }
  }
  </script>
  
  
  <style>
  
  </style>
  