import React, { Component } from "react";
import PropTypes from "prop-types";
import CsvParse from "@vtex/react-csv-parse";
import { Button, Modal, Table, Select, Alert, message } from "antd";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { fetchFaculties } from "../actions/faculties";
import { fetchSchoolsList } from "../actions/schools";
import randomInRange from "../utils";

const { Option } = Select;

const columns = [
  {
    title: "#",
    dataIndex: "index"
  },
  {
    title: "ФИО",
    dataIndex: "name"
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "Класс",
    dataIndex: "grade"
  },
  {
    title: "Пароль",
    dataIndex: "password"
  },
  {
    title: "Номер",
    dataIndex: "phoneNumber"
  },
  {
    title: "Номер родителей",
    dataIndex: "parentPhoneNumber"
  },
  {
    title: "Роль",
    dataIndex: "role"
  }
];
const headers = [
  "index",
  "name",
  "email",
  "grade",
  "phoneNumber",
  "parentPhoneNumber",
  "grade",
  "phoneNumber",
  "parentPhoneNumber"
]

const keys = [
  "index",
  "name",
  "email",
  "grade",
  "phoneNumber",
  "parentPhoneNumber",
  "role"
];

class ImportStudents extends Component {
  state = {
    data: [],
    facultiesSelected: false,
    schoolSelected: false,
    downloaded: false
  };

  componentDidMount() {
    this.props.fetchFaculties();
    this.props.fetchSchoolsList();
  }

  handleData = data => {
    const parsedData = data.filter(
      item => item.index && item.name && item.email
    );
    this.setState({
      data: parsedData.map(item => ({
        ...item,
        email: item.email.toLowerCase(),
        password: item.email.split("@")[0] + randomInRange(100, 999),
        username: item.email.replace(/ /g, "")
      }))
    });
  };

  handleChangeSchool = value => {
    const newData = this.state.data.map(item => ({
      ...item,
      school: value
    }));
    this.setState({ data: newData, schoolSelected: true });
  };

  handleChange = value => {
    const newData = this.state.data.map(item => ({
      ...item,
      faculties: value
    }));
    this.setState({ data: newData, facultiesSelected: true });
  };

  handleCreate = () => {
    const { schoolSelected, facultiesSelected, data, faculties } = this.state;
    if (schoolSelected && facultiesSelected) {
      this.props.onOk(data, faculties);
    } else {
      message.error("Выберите школу и факультет!");
    }
  };

  handleCancel = () => {
    if(!this.state.downloaded && this.state.data){
      message.error("Вы забыли скачать Резултат!!");
    } else{
      this.props.onCancel();
    }
    
  }
  handleDownload = () => {
    this.setState({ downloaded: true });
  }

  render() {
    const {
      visible,
      onCancel,
      title,
      faculties,
      schoolsList,
      failedEmails,
      isFinishedImport
    } = this.props;
    const { data } = this.state;
    const filteredData = [
      [
        "#",
        "ФИО",
        "Email",
        "Класс",
        "Номер",
        "Номер родителей",
        "Роль",
        'Пароль'
      ]
    ];
    data.map(item =>  {
      const dataArr = Object.values(item)
      dataArr.splice(8,1)
      filteredData.push(dataArr)
    });
    
    return (
      <Modal
        visible={visible}
        title={title}
        okText="Create"
        onCancel={this.handleCancel}
        onOk={this.handleCreate}
        width="80%"
      >
        <CsvParse
          keys={keys}
          onDataUploaded={this.handleData}
          onError={this.handleError}
          render={onChange => <input type="file" onChange={onChange} />}
        />
        <Table
          style={{ marginTop: "24px" }}
          columns={columns}
          dataSource={data}
          size="large"
          bordered
        />
        {
          filteredData.length > 1 && 
          <CSVLink data={filteredData}>
            <Button
              style={{ marginTop: 10, width: '100%', height: 60 }}
              type="danger"
              onClick={this.handleDownload}
            >
                Download students data
            </Button>
          </CSVLink>}
        
        <div>
          <Select
            placeholder="Выберите школу"
            style={{ width: "100%", marginTop: 24 }}
            optionFilterProp="children"
            onChange={this.handleChangeSchool}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {schoolsList &&
              schoolsList.map(school => (
                <Option key={school._id} value={school._id}>
                  {school.name}
                </Option>
              ))}
          </Select>
        </div>

        <div>
          <Select
            mode="multiple"
            placeholder="Выберите факультет"
            style={{ width: "100%", marginTop: 24 }}
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {faculties.map(faculty => (
              <Option key={faculty._id} value={faculty._id}>
                {faculty.name}
              </Option>
            ))}
          </Select>
        </div>
        {failedEmails.length > 0 && failedEmails.map(email => (<Alert
          style={{ marginTop: 10 }}
          message={`User с таким email уже существует ${email}`} 
          type="error"
        />))}
        {isFinishedImport && (
          <Alert
            style={{ marginTop: 10 }}
            message="Users registrated!"
            type="success"
          />
        )}
      </Modal>
    );
  }
}

ImportStudents.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  fetchFaculties: PropTypes.func.isRequired,
  faculties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchSchoolsList: PropTypes.func.isRequired,
  schoolsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  failedEmails: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFinishedImport: PropTypes.bool.isRequired
};

function mapStateToProps({ faculties, schoolsList }) {
  return { faculties, schoolsList };
}
export default connect(
  mapStateToProps,
  { fetchFaculties, fetchSchoolsList }
)(ImportStudents);
