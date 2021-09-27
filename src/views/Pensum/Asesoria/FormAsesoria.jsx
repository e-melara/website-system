import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import {
  SendOutlined,
  PlusOutlined,
  CloudUploadOutlined
} from '@ant-design/icons'
import {
  Row,
  Col,
  Card,
  Form,
  Modal,
  Upload,
  Button,
  message,
  Divider
} from 'antd'

import {
  pagoSave,
  addArancelItem,
  loadingAranceles,
  removeArancelItem
} from '../../../redux/ducks/asesoria'

import {
  InpuType,
  TextAreaType,
  InputNumberType,
  SelectInputType,
  InputTypeDatepicker
} from '../../../components/common'

import { FormAsesoriaTableAranceles } from './component/FormAsesoriaTableAranceles'

const disabledDateFn = (current) => {
  return current && current > moment().endOf('day')
}

const FormAsesoria = () => {
  //! dispatch
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    aranceles: { selections, data },
    bancos,
    redirect
  } = useSelector((state) => state.asesoria)

  // useState fileList
  const [fileList, setFileList] = React.useState([])
  // useState form referido
  const [referido, setReferido] = React.useState(false)
  // use state for modal otros
  const [isOpenModalOther, setIsOpenModalOther] = React.useState(false)

  // Options for select option
  let optionsArancel = data.map(function (a) {
    return {
      value: a.idarancel,
      title: a.descripcion
    }
  })

  // useEffect para cargar los aranceles
  React.useEffect(() => {
    dispatch(loadingAranceles())
  }, [dispatch])

  // useEffect para la redireccion del formulario
  React.useEffect(() => {
    if (redirect) {
      history.push('/asesoria')
    }
  }, [redirect, history])

  // form
  const [form] = Form.useForm()

  // Form para aranceles otros
  const [formOther] = Form.useForm()

  // Form para los aranceles seleccionados
  const [formAranceles] = Form.useForm()

  // Props uploadFile
  const maximus = 3
  const handlerBeforeChange = (file) => {
    if (fileList.length + 1 <= maximus) {
      setFileList([...fileList, file])
    } else {
      message.error(`${maximus} es la cantidad de archivos maximos aceptados`)
    }
    return false
  }

  // handler remove upload
  const handlerRemove = (file) => {
    const index = fileList.indexOf(file)
    const newArray = fileList.slice()
    newArray.splice(index, 1)
    setFileList([...newArray])
  }

  // change state banco
  const handlerChangeBanco = (valor) => {
    const referidoValue = bancos[valor - 1].is_referido
    setReferido(!!referidoValue)
  }

  // Handler form arancel (add arancel status)
  const handlerFinishArancel = ({ inputArancel }) => {
    formAranceles.resetFields()
    if (inputArancel.endsWith('0403')) {
      setIsOpenModalOther(true)
    } else {
      const itemArancel = data.find((i) => i.idarancel === inputArancel)
      dispatch(
        removeArancelItem({
          item: itemArancel,
          id: inputArancel
        })
      )
    }
  }

  // handler remove arancel
  const handlerRemoveArancel = (item) => {
    dispatch(addArancelItem(item))
  }

  // handler save information
  const handlerSaveInformation = (values) => {
    const { monto } = values
    const count = fileList.length
    const countAranceles = selections.length

    const totalAranceles = selections.reduce(function (acc, record) {
      return acc + record.precio
    }, 0)

    if (count === 0) {
      Modal.error({
        title: 'Error',
        content: 'Se debe anexar por lo menos un archivo que compruebe su pago'
      })
      return
    }
    if (countAranceles === 0) {
      Modal.error({
        title: 'Error',
        content: 'Se seleccionar los aranceles que cumplan con el pago'
      })
      return
    }

    if (monto !== totalAranceles) {
      Modal.error({
        title: 'Error',
        content: 'El campos monto debe ser igual al total de los aranceles'
      })
      return
    }

    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })

    // convirtiendo los datos del pago a json string
    formData.append('pago', JSON.stringify(values))
    // convirtiendo los datos de los aranceles a json string
    formData.append('aranceles', JSON.stringify(selections))

    dispatch(pagoSave(formData))
  }

  // handler save arancel other
  const handlerOtherAdd = (values) => {
    setIsOpenModalOther(false)
    formAranceles.resetFields()
    const item = data.find((i) => i.idarancel.endsWith('0403'))
    const resolve = Object.assign(item, {
      precio: values.monto
    })

    dispatch(
      removeArancelItem({
        item: resolve,
        id: resolve.idarancel
      })
    )
  }

  return (
    <>
      <Card title="Anexar informacion">
        <Row gutter={24}>
          <Col span={10}>
            <h4 style={{ textAlign: 'center' }}>Informacion de pago</h4>
            <Form
              form={form}
              size="large"
              name="form-banco"
              onFinish={handlerSaveInformation}
            >
              <Row gutter={24}>
                <Divider />
                <SelectInputType
                  column={{ span: 12 }}
                  item={{
                    label: '',
                    name: 'banco',
                    hasFeedback: true,
                    rules: [
                      { required: true, message: 'El Banco es requerido' }
                    ],
                    placeholder: '* Seleccione el tipo de banco'
                  }}
                  options={bancos}
                  events={{ onChange: handlerChangeBanco }}
                />
                <InpuType
                  column={{ span: 12 }}
                  item={{
                    label: '',
                    name: 'referido',
                    hasFeedback: true,
                    rules: [
                      {
                        required: true,
                        message: `El ${
                          referido
                            ? 'Numero de referencia '
                            : 'Nombre del titular '
                        } es obligatorio`
                      }
                    ]
                  }}
                  input={{
                    placeholder: referido
                      ? '* Numero de referencia'
                      : '* El nombre del titular',
                    allowClear: true
                  }}
                />
                <InputNumberType
                  column={{ span: 12 }}
                  item={{
                    label: '',
                    name: 'monto',
                    rules: [
                      { required: true, message: 'El monto es requerido' }
                    ]
                  }}
                  input={{
                    max: 10000,
                    min: 0,
                    precision: 2,
                    placeholder: '* Monto a pagar (USD)'
                  }}
                />

                <InputTypeDatepicker
                  column={{ span: 12 }}
                  item={{
                    name: 'fechaPago',
                    label: '',
                    rules: [
                      {
                        required: true,
                        message: 'La fecha de pago es importante'
                      }
                    ]
                  }}
                  input={{
                    allowClear: true,
                    format: 'DD/MM/YYYY',
                    disabledDate: disabledDateFn,
                    placeholder: 'Seleccione la fecha de pago'
                  }}
                />
                <TextAreaType
                  column={{ span: 24 }}
                  item={{
                    name: 'concepto',
                    label: '',
                    rules: [
                      { required: true, message: 'El concepto es requerido ' }
                    ]
                  }}
                  input={{
                    rows: 3,
                    allowClear: true,
                    placeholder: '* Concepto del pago'
                  }}
                />
                <Divider />
                <Col span={24}>
                  <Upload
                    name="name"
                    maxCount={3}
                    fileList={fileList}
                    listType="picture"
                    accept="image/*,.pdf"
                    onRemove={handlerRemove}
                    beforeUpload={handlerBeforeChange}
                  >
                    <Button size="large" icon={<CloudUploadOutlined />}>
                      Click para anexar los archivos
                    </Button>
                  </Upload>
                </Col>
              </Row>
              <Divider />
              <Row justify="end">
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                >
                  Enviar
                </Button>
              </Row>
            </Form>
          </Col>
          <Col span={14}>
            <Form
              form={formAranceles}
              size="large"
              onFinish={handlerFinishArancel}
            >
              <h4 style={{ textAlign: 'center' }}>Aranceles</h4>
              <Divider />
              <Row justify="space-between">
                <SelectInputType
                  column={{ span: 20 }}
                  item={{
                    label: '',
                    size: 'large',
                    name: 'inputArancel',
                    placeholder: 'Seleccione el arancel',
                    rules: [
                      { required: true, message: 'El arancel es requirido' }
                    ]
                  }}
                  options={optionsArancel}
                />
                <Col span={3}>
                  <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    Agregar
                  </Button>
                </Col>
              </Row>
              <Divider />
            </Form>
            {/* Component para la tabla */}
            <FormAsesoriaTableAranceles
              aranceles={selections}
              handlerRemoveArancel={handlerRemoveArancel}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        visible={isOpenModalOther}
        footer={[]}
        title="Agregrar otra cantidad"
        onCancel={() => setIsOpenModalOther(false)}
      >
        <Form
          form={formOther}
          onFinish={handlerOtherAdd}
          initialValues={{
            monto: null
          }}
        >
          <InputNumberType
            column={{ span: 24 }}
            item={{
              name: 'monto',
              label: 'Monto',
              rules: [{ required: true, message: 'El monto es requerido' }]
            }}
            input={{
              min: 0.05,
              precision: 2,
              placeholder: 'Monto agregar $ (minimo: $0.05)'
            }}
          />
          <Row justify="end">
            <Button htmlType="submit" icon={<PlusOutlined />} type="primary">
              Agregar
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default FormAsesoria
