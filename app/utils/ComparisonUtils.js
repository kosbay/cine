/* eslint-disable */
import _ from "lodash";

const ComparisonUtils = {
  difference: (object, base) => {
    function changes(obj, bs) {
      return _.transform(obj, (result, value, key) => {
        if (!_.isEqual(value, bs[key])) {
          result[key] =
            _.isObject(value) && _.isObject(bs[key])
              ? changes(value, bs[key])
              : value;
        }
      });
    }
    return Object.keys(changes(object, base)).length;
  }
};

export default ComparisonUtils;
