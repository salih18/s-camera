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
    auth: {
      session: null,
      isAuthenticated: false,
      user: null,
      error: null,
    },
    cameras: {
      data: null,
    },
  },
  mutations: {
    loadUser(state, payload) {
      state.auth = {
        ...state.auth,
        user: payload,
        error: null,
      };
    },
    login(state, payload) {
      state.auth = {
        ...state.auth,
        isAuthenticated: true,
        session: payload,
        error: null,
      };
    },
    logout(state) {
      state.auth = {
        session: null,
        isAuthenticated: false,
        user: null,
        error: null,
      };
      state.cameras.data = null;
    },
    getAccountCameras(state, payload) {
      state.cameras = {
        data: payload,
      };
    },
    getAccountCameraSnapshot(state, payload) {
      const camera = state.cameras.data.find(
        (camera) => camera.cameraId === payload.cameraId
      );
      camera["snapshot"] = `data:image/jpeg;base64,${payload.snapshot}`;
    },
    setErrorLogin(state, payload) {
      state.auth = {
        error: payload,
        isAuthenticated: false,
        session: null,
        user: null,
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
        commit("login", res.data);
        await dispatch("loadUser");
        router.push({ path: "dashboard" });
      } catch (error) {
        console.log("Error on login", { error });
        commit("setErrorLogin", error.response?.data?.error_description);
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
    async getAccountCameras({ commit }) {
      try {
        const cameras = await api.get(`${API_URL}/cameras`);
        commit("getAccountCameras", cameras.data);
      } catch (error) {
        console.log("Error getting account cameras", error);
      }
    },
    async getAccountCameraSnapshot({ commit }, id) {
      // https://rest.cameramanager.com/rest/v2.4/cameras/1841837/snapshot?resolution=1000x100
      try {
        const snapshot = await api.get(
          `${API_URL}/cameras/${id}/snapshot?resolution=1000x100`,
          {
            responseType: "arraybuffer",
          }
        );

        const payload = {
          snapshot: Buffer.from(snapshot.data, "binary").toString("base64"),
          cameraId: id,
        };
        console.log(
          "🚀 ~ file: index.js ~ line 116 ~ getAccountCameraSnapshot ~ payload",
          payload
        );
        commit("getAccountCameraSnapshot", payload);
      } catch (error) {
        console.log("Error getting account cameras", error);
      }
    },
  },
  getters: {
    getSession(state) {
      return state.auth.session;
    },
    getAccountCameras(state) {
      return state.cameras.data;
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
