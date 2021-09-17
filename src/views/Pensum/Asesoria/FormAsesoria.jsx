import moment from 'moment'
import { useHistory } from 'react-router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  SendOutlined,
  PlusOutlined,
  DeleteOutlined,
  CloudUploadOutlined
} from '@ant-design/icons'
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Modal,
  Upload,
  Button,
  message,
  Divider,
  Typography
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

const disabledDateFn = (current) => {
  return (
    (current && current < moment().subtract('15', 'days').endOf('day')) ||
    current > moment().endOf('day')
  )
}

const { Title } = Typography

const FormAsesoria = () => {
  //! dispatch
  const dispatch = useDispatch()
  const history = useHistory()
  const { aranceles, bancos, redirect } = useSelector((state) => state.asesoria)

  //! useState fileList
  const [fileList, setFileList] = React.useState([])
  //! useState form referido
  const [referido, setReferido] = React.useState(false)
  //! useState form aranceles (Table)
  const [arancelesTB, setArancelesTB] = useState([])
  //! useState total aranceles
  const [totalAranceles, setTotalAranceles] = useState(0)

  //! Options for select option
  let optionsArancel = aranceles
    .map((a) => ({
      value: a.id,
      title: a.descripcion
    }))
    .sort(function (a, b) {
      return a.value.localeCompare(b.value)
    })

  //! useEffect para cargar los aranceles
  React.useEffect(() => {
    dispatch(loadingAranceles())
  }, [dispatch])

  //! useEffect para la redireccion del formulario
  useEffect(() => {
    if (redirect) {
      console.log(redirect);
      history.push('/asesoria')
    }
  }, [redirect, history])

  //! form
  const [form] = Form.useForm()
  //! Form para los aranceles seleccionados
  const [formAranceles] = Form.useForm()

  //! Props uploadFile
  const maximus = 3
  const handlerBeforeChange = (file) => {
    if (fileList.length + 1 <= maximus) {
      setFileList([...fileList, file])
    } else {
      message.error(`${maximus} es la cantidad de archivos maximos aceptados`)
    }
    return false
  }

  //! handler remove upload
  const handlerRemove = (file) => {
    const index = fileList.indexOf(file)
    const newArray = fileList.slice()
    newArray.splice(index, 1)
    setFileList([...newArray])
  }

  //! change state banco
  const handlerChangeBanco = (valor) => {
    const referidoValue = bancos[valor - 1].is_referido
    setReferido(!!referidoValue)
  }

  //! Handler form arancel (add arancel status)
  const handlerFinishArancel = ({ inputArancel }) => {
    const arancel = aranceles.find(function (a) {
      return a.id === inputArancel
    })

    formAranceles.resetFields()
    setArancelesTB((a) => [...a, arancel])
    dispatch(removeArancelItem(inputArancel))
  }

  //! handler remove arancel
  const handlerRemoveArancel = (item) => {
    const arrayCopy = arancelesTB.filter((a) => a.id !== item.id)
    setArancelesTB(arrayCopy)
    dispatch(addArancelItem(item))
  }

  //! handler save information
  const handlerSaveInformation = (values) => {
    const { monto } = values
    const count = fileList.length
    const countAranceles = arancelesTB.length

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

    // armando los datos del formulario
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })

    // convirtiendo los datos del pago a json string
    formData.append('pago', JSON.stringify(values))
    // convirtiendo los datos de los aranceles a json string
    formData.append('aranceles', JSON.stringify(arancelesTB))

    dispatch(pagoSave(formData))
  }

  const columns = [
    {
      dataIndex: 'descripcion',
      title: 'Concepto',
      key: 'descripcion'
    },
    {
      dataIndex: 'precio',
      title: 'Precio',
      key: 'precio',
      render: (precio) => <span>$ {parseFloat(precio).toFixed(2)}</span>
    },
    {
      dataIndex: 'actions',
      title: '',
      width: '100px',
      align: 'center',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handlerRemoveArancel(record)}
          icon={<DeleteOutlined />}
          danger
        />
      )
    }
  ]

  return (
    <>
      <Card title="Anexar informacion">
        <Row gutter={24}>
          <Col span={10}>
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
            <Table
              bordered
              rowKey="id"
              size="small"
              pagination={false}
              dataSource={arancelesTB}
              columns={columns}
              summary={(pageData) => {
                let totalPrice = 0
                pageData.forEach(({ precio }) => {
                  totalPrice += precio
                })
                setTotalAranceles(totalPrice)
                return (
                  <Table.Summary>
                    <Table.Summary.Row>
                      <Table.Summary.Cell>
                        <Title level={5}>Total</Title>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell colSpan={2}>
                        <Title align="center" level={4} type="success">
                          $ {totalPrice.toFixed(2)}
                        </Title>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )
              }}
            />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default FormAsesoria
