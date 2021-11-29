import Vue from "vue";
import Vuex from "vuex";
import router from "./../router";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import api from "./../helpers/api";

import SecureLS from "secure-ls";
/* This library is used for encryption. In this project it is used 
to encrypt the vuex persistent state in localstorage */
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

const API_URL = process.env.VUE_APP_API_URL;
const LOGIN_URL = `${process.env.VUE_APP_LOGIN_URL}?grant_type=password&scope=write`;
const API_KEY = process.env.VUE_APP_API_KEY;
const API_SECRET = process.env.VUE_APP_API_SECRET;

export default new Vuex.Store({
  state: {
    user: {
      session: null,
      isAuthenticated: false,
      data: null,
    },
  },
  mutations: {
    loadUser(state, payload) {
      state.user = {
        ...state.user,
        data: payload,
      };
    },
    setSession(state, payload) {
      state.user = {
        ...state.user,
        isAuthenticated: true,
        session: payload,
      };
    },
    logout(state) {
      state.user = {
        session: null,
        isAuthenticated: false,
        data: null,
      };
    },
  },
  actions: {
    async login({ dispatch, commit }, { username, password }) {
      const url = `${LOGIN_URL}&username=${username}&password=${password}`;
      const encodedApiCredentials = btoa(`${API_KEY}:${API_SECRET}`);
      const options = {
        url,
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedApiCredentials}`,
        },
      };

      try {
        const res = await axios(options);
        commit("setSession", res.data);
        await dispatch("loadUser");
        router.push({ path: "dashboard" });
      } catch (error) {
        console.log("Error on login", error);
        commit("setSession", null);
      }
    },
    async loadUser({ commit }) {
      try {
        const res = await api.get(`${API_URL}/users/self`);
        commit("loadUser", res.data);
      } catch (error) {
        console.log("Error load user", error);
      }
    },
  },
  getters: {
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getSession(state) {
      return state.user.session;
    },
  },
  plugins: [
    // This plugin is used to have persistence vuex state.
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
