import moment from 'moment'
import React, { useEffect } from 'react'
import { SaveOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Form, Button, Select, DatePicker } from 'antd'

import {
  loadingDataAsesoria,
  saveConfiguration
} from '../../../../redux/ducks/admin/asesoria'

const { Option } = Select

export const Configuration = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const {
    configuration: { extra, valor, loading }
  } = useSelector((state) => state.adminAsesoria)

  useEffect(() => {
    dispatch(loadingDataAsesoria())
  }, [dispatch])

  const handlerOnFinish = (values) => {
    dispatch(saveConfiguration(values))
  }

  if (!loading) {
    return <p>Espere ...</p>
  }

  return (
    <>
      <Card title="Configuracion de Asesoria">
        <Form
          form={form}
          initialValues={{
            asesoria: valor,
            fecha_max: moment(extra)
          }}
          onFinish={handlerOnFinish}
          name="formulario-asesoria"
          labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 6
          }}
          size="large"
          layout="horizontal"
        >
          <Form.Item
            name="asesoria"
            label="Asesoria"
            rules={[{ required: true, message: 'El campo es requerido' }]}
          >
            <Select allowClear>
              <Option value={'1'}>Activada</Option>
              <Option value={'0'}>Desactivada</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Fecha de Inscripcion"
            name="fecha_max"
            rules={[{ required: true, message: 'La fecha es necesaria' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 12
            }}
          >
            <Button icon={<SaveOutlined />} htmlType="submit" type="default">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
