class P5Class {
  className = 'P5Class';

  state = {};

  childrens = [];

  props = {};

  constructor({
    p5, props, convertStateToProps, convertParentPropsToProps,
  }) {
    this.p5 = p5;
    this.draw = this.draw.bind(this);
    this.preload = this.preload.bind(this);
    this.setup = this.setup.bind(this);
    this.props = props || {};
    this.convertStateToProps = convertStateToProps ? convertStateToProps.bind(this) : this.convertStateToProps;
    this.convertParentPropsToProps = convertParentPropsToProps ? convertParentPropsToProps.bind(this) : this.convertParentPropsToProps;
  }

  async setState(newState) {
    this.state = { ...this.state, ...newState };
    this.handleStateUpdate(this.state);
  }

  async resetState(newState) {
    this.state = { ...this.state, ...newState };
  }

  addChildren(...childrens) {
    this.childrens = [...this.childrens, ...childrens];
  }

  handleStateUpdate(updatedState) {
    this.childrens.map(children => children.onDidStateUpdate(updatedState));
  }

  async reset() {
    await this.onReset();
    return Promise.all(this.childrens.map(async (children) => {
      await children.reset();
      children.preload();
      children.setup();
    }));
  }

  /* eslint-disable class-methods-use-this */
  convertStateToProps() { return {}; }

  onReset() {}

  convertParentPropsToProps(newProps) { return newProps; }

  onDidStateUpdate(newState) {
    const newProps = this.convertStateToProps(newState);
    this.props = { ...this.props, ...newProps };
    this.handlePropsDidChange(newProps);
  }

  handlePropsDidChange(newProps) {
    if (Object.keys(newProps).length === 0) return;
    this.childrens.map(children => children.onParentPropsChange(newProps));
  }

  onParentPropsChange = (newProps) => {
    const convertedProps = this.convertParentPropsToProps(newProps);
    this.props = { ...this.props, ...convertedProps };
    this.childrens.map(children => children.onParentPropsChange(newProps));
  }

  preload() {
    this.childrens.map(children => children.preload());
  }

  setup() {
    this.childrens.map(children => children.setup());
  }

  draw() {
    this.childrens.map(children => children.draw());
  }
  /* eslint-enable class-methods-use-this */
}

export default P5Class;
