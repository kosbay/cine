import React from 'react';
import PropTypes from 'prop-types';
import { Loading, ErrorComponent } from 'components';

const StatefulView = ({ renderLoading, renderError, renderOkState }) => (
  optionsOrFunc,
  options
) => {
  const isMutateFunc = typeof optionsOrFunc === 'function';
  const stateOptions = isMutateFunc ? options : optionsOrFunc;
  const { loading, error, ...otherOptions } = stateOptions;

  if (loading) {
    return renderLoading ? renderLoading() : <Loading />;
  }
  if (error) {
    return renderError ? renderError() : <ErrorComponent error={error} />;
  }

  const args = isMutateFunc ? [optionsOrFunc, { ...otherOptions }] : [{ ...otherOptions }];

  return renderOkState(...args);
};

StatefulView.propTypes = {
  data: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
};

StatefulView.defaultProps = {
  error: null,
};

export default StatefulView;
