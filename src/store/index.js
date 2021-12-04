import Vue from "vue";
import Vuex from "vuex";
import router from "./../router";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import api from "./../helpers/api";
import { offlineCameraImage, onlineCameraImage } from "../helpers/camera-utils";

import SecureLS from "secure-ls";
/* This library is used for encryption. In this project it is used 
to encrypt the vuex persistent state in localstorage */
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

const API_URL = process.env.VUE_APP_API_URL;
const LOGIN_URL = `${process.env.VUE_APP_LOGIN_URL}?grant_type=password&scope=write`;
const API_KEY = process.env.VUE_APP_API_KEY;
const API_SECRET = process.env.VUE_APP_API_SECRET;

const getDefaultState = () => {
  return {
    auth: {
      session: null,
      isAuthenticated: false,
      user: null,
      error: null,
    },
    cameras: {
      all: Object.create(null),
      snapshots: Object.create(null),
      ids: [],
      loaded: false,
    },
  };
};

export default new Vuex.Store({
  state: getDefaultState(),
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
      localStorage.removeItem("vuex");
      Object.assign(state, getDefaultState());
      router.push({ path: "/" });
    },
    getAccountCameras(state, { cameraStatuses, cameras }) {
      const cameraState = {
        ids: [],
        all: Object.create(null),
        snapshots: Object.create(null),
        loaded: true,
      };

      cameras.forEach((camera, index) => {
        cameraState.ids.push(camera.cameraId);
        Vue.set(cameraState.all, camera.cameraId, {
          ...camera,
          ...cameraStatuses[index],
        });
      });

      state.cameras = cameraState;
    },
    getAccountCameraSnapshot(state, { snapshots, ids }) {
      ids.forEach((id, index) => {
        Vue.set(state.cameras.snapshots, id, snapshots[index]);
      });
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
    async getAccountCameras({ commit, dispatch }) {
      try {
        const cameras = await api.get(`${API_URL}/cameras`);
        const cameraStatuses = await api.get(`${API_URL}/cameras/all/status`);
        commit("getAccountCameras", {
          cameras: cameras.data,
          cameraStatuses: cameraStatuses.data,
        });
        await dispatch(
          "getAccountCameraSnapshot",
          cameras.data.map((c) => c.cameraId)
        );
      } catch (error) {
        if (error.response.data.code === 8) {
          commit("setErrorLogin");
        }
        console.log("Error getting account cameras", { error });
      }
    },
    async getAccountCameraSnapshot({ commit }, ids) {
      try {
        const promises = ids.map((id) =>
          api.get(`${API_URL}/cameras/${id}/snapshot?resolution=1000x100`, {
            responseType: "arraybuffer",
          })
        );
        const snapshots = await Promise.allSettled(promises);
        const snapshotsData = snapshots.map((snapshot) => {
          if (snapshot.status === "fulfilled") {
            return onlineCameraImage(snapshot);
          } else {
            return offlineCameraImage;
          }
        });

        commit("getAccountCameraSnapshot", { snapshots: snapshotsData, ids });
      } catch (error) {
        console.log("Error getting account camera snapshots", error);
      }
    },
  },
  getters: {
    getSession(state) {
      return state.auth.session;
    },
    getAccountCameras(state) {
      return state.cameras.ids.reduce((acc, id) => {
        const camera = state.cameras.all[id];
        const snapshot = state.cameras.snapshots[id];
        if (!camera) {
          throw Error("This camera not found");
        }

        return acc.concat({ ...camera, snapshot });
      }, []);
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
