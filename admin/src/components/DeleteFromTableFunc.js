import {  Modal } from 'antd';

const confirmModal = Modal.confirm;

const showConfirm = (func) => {
  confirmModal({
    title: 'Are you sure that you want to delete this record?',
    content: 'This record will be deleted',
    onOk: () =>  func(),
    // eslint-disable-next-line
    onCancel: () => console.log('Cancel'),
  });
}  

export default showConfirm;