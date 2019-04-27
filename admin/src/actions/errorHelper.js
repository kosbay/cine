import { pushError } from "./messages";

export default (err, dispatch) => {
  if (err.response) { 
    pushError(dispatch, err.response.data.message 
      ? err.response.data.message : err.response.data);
    return;
  }
  pushError(dispatch, "Unspecified error");
};
