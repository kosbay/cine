import axios from "axios";

import { pushError } from "./messages";

import { FETCH_COMPILER_LIST } from "./types";

const getCompilerList = () => async dispatch => {
  try {
    const res = await axios.get("/api/compile/getCompilerList");
    dispatch({ type: FETCH_COMPILER_LIST, payload: res.data.items });
  } catch (err) {
    if (err.response) {
      pushError(dispatch, err.response.data);
    } else {
      pushError(dispatch, "Unspecified error");
    }
  }
};

export default getCompilerList;