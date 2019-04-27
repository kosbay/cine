import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from 'config';
import { ErrorHandling } from 'components';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import { saveURLBeforLogin } from 'actions';

const mergeArray = ({ initialData, data }) => {
  if (!Array.isArray(data)) return initialData;
  const ids = initialData.map(({ _id }) => _id);
  const diff = data.filter(({ _id }) => !`${ids}`.includes(_id));
  return [...initialData, ...diff];
};

class Querry extends React.PureComponent {
    static propTypes = {
      endpoint: PropTypes.string.isRequired,
      saveURLBeforLogin: PropTypes.func.isRequired,
      children: PropTypes.func.isRequired,
      variables: PropTypes.shape({}),
      path: PropTypes.string,
      initialData: PropTypes.oneOfType(
        [PropTypes.shape({}), PropTypes.string, PropTypes.arrayOf(PropTypes.shape({}))]
      ),
      normalizer: PropTypes.func,
    };

    static defaultProps = {
      variables: {},
      path: '',
      initialData: null,
      normalizer: s => s,
    };

    state = {
      loading: true,
      /* eslint-disable */
      data: this.props.initialData,
      /* eslint-enable */
      error: null,
    };

    componentDidMount() {
      this.requestByEndpoint();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const { initialData } = nextProps;
      const { data } = prevState;
      if (initialData && Object.keys(initialData).length !== 0
        && data && Object.keys(data).length !== 0
      ) {
        const newData = Array.isArray(initialData)
          ? mergeArray({ initialData, data })
          : { ...data, ...initialData };
        return { data: newData };
      }

      return null;
    }

    requestByEndpoint = async (newParams) => {
      const {
        initialData, endpoint, variables, path, normalizer,
      } = this.props;
      try {
        if (initialData) {
          this.setState({ data: initialData, loading: false, error: null });
        } else {
          this.setState({ data: null, loading: true, error: null });
        }
        const querry = config.getEndpoints()[endpoint];
        if (!querry) {
          throw new Error('Endpoint do not exist or not provided');
        }
        const token = localStorage.getItem('token');
        const params = newParams ? { ...variables, ...newParams } : variables;
        const querryWithPath = path ? `${querry}/${path}` : querry;
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const { data: result } = await axios.get(querryWithPath, {
          ...headers, params,
        });

        normalizer(result);
        return this.setState({ data: result, loading: false, error: null });
      } catch (err) {
        // eslint-disable-next-line
        console.log('err', err);
        const actions = { saveURLBeforLogin: this.props.saveURLBeforLogin };
        ErrorHandling({ errorCode: err.response ? err.response.status : '', link: window.location.href, actions });
        /* eslint-disable-next-line */
        return this.setState({ data: null, loading: false, error: { ...err, endpoint }});
      }
    };

    render() {
      const { children } = this.props;
      const { loading, error, data } = this.state;
      return children({
        loading, error, data, refetch: this.requestByEndpoint,
      });
    }
}

const mapDispatchToProps = dispatch => ({
  saveURLBeforLogin: url => saveURLBeforLogin(url, dispatch),
});

const withState = connect(
  null,
  mapDispatchToProps
);

const EnchantedQuerry = compose(
  withState,
)(Querry);


export default EnchantedQuerry;
