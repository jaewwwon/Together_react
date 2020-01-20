import { all, fork } from "redux-saga/effects";
import axios from "axios";
import user from "./user";
import group from "./group";

axios.defaults.baseURL = "http://localhost:8080/api";

export default function* rootSaga() {
  yield all([fork(user), fork(group)]);
}
