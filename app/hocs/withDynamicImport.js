import React from 'react';
/*
  dynamicImports - array
  [
    { importThread: String, name, saveToState, parse }
  ]
*/

const withDynamicImport = dynamicImports => (ComposedComponent) => {
  class WithDynamicImport extends React.PureComponent {
    state = {};

    componentDidMount() {
      if (!dynamicImports) throw new Error('Provide dynamic imports');

      dynamicImports.forEach(({
        importThread, name, saveToState, parse,
      }) => {
        importThread.then((md) => {
          const module = parse ? md[parse] : md;
          if (saveToState) {
            const moduleState = saveToState(module);
            return this.setState(moduleState);
          }

          if (name) {
            const moduleState = { [name]: module };
            return this.setState(moduleState);
          }

          return this.setState({ module });
        }).catch(err => console.warn('Import error: ', err));
      });
    }

    render() {
      return <ComposedComponent {...this.props} {...this.state} />;
    }
  }

  return WithDynamicImport;
};

export default withDynamicImport;
