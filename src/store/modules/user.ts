interface UserState {
  personInfo: {
    address: string;
    birthdate: string;
    cardtype: string;
    id: number;
    idcard: string;
    isvalidate: number;
    latitude: number;
    longitude: number;
    mobile: string;
    nature: string;
    openId: string;
    orgid: number;
    realname: string;
    sexcode: 1 | 2;
    sn: string;
    title: string;
    token: string;
    username: string;
  } | null;
  role: string;
}
export const userStore = {
  state: {
    personInfo: {},
    role: '',
  },
  getters: {
    getPersonInfo(state) {
      return state.personInfo;
    },
    getRole(state) {
      return state.role;
    },
  },
  mutations: {
    setPersonInfo(state, data) {
      state.personInfo = data;
    },
    setRole(state: UserState, data) {
      state.role = data;
    },
  },
};
