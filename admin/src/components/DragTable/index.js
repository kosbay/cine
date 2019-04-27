import React from "react";
import { Table, Button } from "antd";
import { DragDropContext } from "react-dnd";
import PropTypes from "prop-types";
import HTML5Backend from "react-dnd-html5-backend";

import DragableBodyRow from "./BodyRow";

class DragSortingTable extends React.Component {
  // static getDerivedStateFromProps(props, state) {
  //   if (props.dataSource !== state.data) {
  //     return {
  //       data: props.dataSource
  //     };
  //   }
  //   return null;
  // }

  // state = {
  //   data: this.props.dataSource || []
  // };

  components = {
    body: {
      row: DragableBodyRow
    }
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { dataSource } = this.props;
    const dragRow = dataSource[dragIndex];

    const newData = {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
    };

    this.props.onMoveRow(newData);
  };

  renderTitle = () => (
    <React.Fragment>
      <Button onClick={this.props.onShowCreateModal}>Add lesson</Button>
      <Button onClick={this.props.onUpdateModule}>Update module</Button>
    </React.Fragment>
  );

  render() {
    return (
      <Table
        columns={this.props.columns}
        rowKey={record => record.name}
        dataSource={this.props.dataSource}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow
        })}
        title={this.renderTitle}
      />
    );
  }
}

DragSortingTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onShowCreateModal: PropTypes.func.isRequired,
  onUpdateModule: PropTypes.func.isRequired,
  onMoveRow: PropTypes.func.isRequired
};

const DragTable = DragDropContext(HTML5Backend)(DragSortingTable);

export default DragTable;
