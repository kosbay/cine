import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ErrorHandling } from 'components';
import config from '../config';

class Mutation extends React.PureComponent {
    static propTypes = {
      endpoint: PropTypes.string.isRequired,
      children: PropTypes.func.isRequired,
      normalizer: PropTypes.func,
      type: PropTypes.string,
    };

    static defaultProps = {
      normalizer: s => s,
      type: 'post',
    };

    state = {
      loading: false,
      error: null,
    };

    mutate = async ({ variables, path }) => {
      try {
        this.setState({ loading: true, data: null, error: null });
        const { endpoint, normalizer, type } = this.props;
        const token = localStorage.getItem('token');
        const mutationEndpoint = config.getEndpoints()[endpoint];
        if (!mutationEndpoint) {
          throw new Error('Endpoint do not exist or not provided');
        }
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const mutationEndpointWithPath = path ? `${mutationEndpoint}${path}` : mutationEndpoint;
        const { data: result } = await axios[`${type}`.toLowerCase()](
          mutationEndpointWithPath, variables, headers
        );
        normalizer(result);
        this.setState({ data: result, loading: false, error: null });
        return ({ data: result, loading: false, error: null });
      } catch (err) {
        ErrorHandling({ errorCode: err.response.status, link: window.location.href });
        this.setState({ data: null, loading: false, error: err });
        return ({ data: null, loading: false, error: err });
      }
    };

    render() {
      const { children, ...props } = this.props;
      const { loading, error, data } = this.state;
      return children(this.mutate, {
        loading, error, data, props,
      });
    }
}

export default Mutation;
