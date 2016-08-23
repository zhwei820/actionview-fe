import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import Select from 'react-select';

const img = require('../../assets/images/loading.gif');
const fieldTypes = require('../share/FieldTypes.js');

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.key) {
    errors.key = 'Required';
  }

  if (!values.type) {
    errors.type = 'Required';
  }
  return errors;
};

@reduxForm({
  form: 'field',
  fields: [ 'name', 'key', 'type', 'description' ],
  validate
})
export default class CreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, create, close } = this.props;
    const ecode = await create(values);
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
    } else {
      this.setState({ ecode: ecode });
    }
  }

  handleCancel() {
    const { close, submitting } = this.props;
    if (submitting) {
      return;
    }
    this.setState({ ecode: 0 });
    close();
  }

  render() {
    const { fields: { name, key, type, description }, handleSubmit, invalid, submitting } = this.props;
    const styles = { width: '60%' };

    return (
      <Modal { ...this.props } onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>创建字段</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) }>
        <Modal.Body className={ submitting ? 'disable' : 'enable' }>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>字段名</ControlLabel>
            <FormControl type='text' { ...name } placeholder='字段名'/>
          </FormGroup>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>键值</ControlLabel>
            <FormControl type='text' { ...key } placeholder='键值唯一'/>
          </FormGroup>
          <FormGroup controlId='formControlsSelect'>
            <ControlLabel>类型</ControlLabel>
            <Select options={ fieldTypes } simpleValue value={ type.value } onChange={ newValue => { type.onChange(newValue) } } placeholder='请选择字段类型'/>
          </FormGroup>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>描述</ControlLabel>
            <FormControl type='text' { ...description } placeholder='描述内容'/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && 'aaaa' }</span>
          <image src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button className='ralign' disabled={ submitting || invalid } type='submit'>确定</Button>
          <Button disabled={ submitting } onClick={ this.handleCancel }>取消</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}