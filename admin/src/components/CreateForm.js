import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Select, Checkbox } from "antd";

const FormItem = Form.Item;

class CreateForm extends Component {
  state = {};

  render() {
    const { visible, onCancel, onCreate, form, fields, title } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={title}
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          {fields.map(field => (
            <FormItem key={field.label} label={field.label}>
              {getFieldDecorator(field.key, {
                rules: [
                  {
                    required: !field.isNotRequired,
                    message: `Please give a name to a ${field.label}`
                  }
                ]
              })(
                /* eslint-disable */
                field.options ? (
                  <Select
                    mode={field.mode || "single"}
                    placeholder="Choose type"
                  >
                    {field.options.map(option => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                field.checkbox ? 
                    <Checkbox />
                  :
                  field.number ? <Input type="number"/> : <Input />
                )
                /* eslint-enable */
              )}
            </FormItem>
          ))}
        </Form>
      </Modal>
    );
  }
}

CreateForm.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  form: PropTypes.shape({}).isRequired
};

export default Form.create()(CreateForm);
