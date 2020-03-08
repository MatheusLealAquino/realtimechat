import Vue from 'vue'
import axios from 'axios'

const axiosInstace = axios.create({
  baseURL: 'localhost:3000/api/'
})

Vue.prototype.$axios = axiosInstace
