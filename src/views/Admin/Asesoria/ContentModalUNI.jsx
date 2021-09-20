import React from 'react'
import Moment from 'react-moment'
import {
  Row,
  Col,
  Divider,
  PageHeader,
  Descriptions,
  Table,
  Image,
  Space
} from 'antd'

import { BaseAssets } from '../../../consts'

const columns = [
  {
    key: 'descripcion',
    dataIndex: 'descripcion',
    title: 'Concepto'
  },
  {
    width: '150px',
    key: 'precio',
    align: 'right',
    title: 'Precio',
    dataIndex: 'precio',
    render: (price) => <span>$ {parseFloat(price).toFixed(2)}</span>
  }
]

export function ContentModalUNI({ pago }) {
  const {
    banco,
    aranceles,
    archivos,
    nombre_titular,
    monto,
    concepto,
    fecha_pago
  } = pago
  return (
    <>
      <Divider />
      <Row gutter={24}>
        <Col
          span={24}
          style={{
            background: '#f5f5f5',
            padding: 24
          }}
        >
          <PageHeader
            ghost={false}
            title="Pago"
            subTitle="Detalles del pago realizado por medio de UNI"
            footer={
              <Row className="tabs" gutter={24}>
                <Col span={12}>
                  <h4>Aranceles</h4>
                  <Table
                    bordered
                    columns={columns}
                    pagination={false}
                    rowKey="arancel_id"
                    dataSource={aranceles}
                    summary={(pageData) => {
                      let total = 0
                      pageData.forEach((item) => {
                        total += item.precio
                      })

                      return (
                        <Table.Summary.Row>
                          <Table.Summary.Cell>
                            <span>Total</span>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell align="right">
                            <span>$ {total.toFixed(2)}</span>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      )
                    }}
                  />
                </Col>
                <Col span={12}>
                  <h4>Archivos</h4>
                  <Image.PreviewGroup>
                    <Space wrap={true}>
                      {archivos &&
                        archivos.map(({ tipo, url }) => {
                          if (tipo === 'jpg' || tipo === 'png') {
                            return (
                              <Image width={200} src={`${BaseAssets}${url}`} />
                            )
                          }
                        })}
                    </Space>
                  </Image.PreviewGroup>
                </Col>
              </Row>
            }
          >
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="Banco">
                {banco.nombre}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  banco.is_referido ? '# de referencia' : 'Cuenta bancaria a nombre de'
                }
              >
                <span>{nombre_titular}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Monto">
                $ {parseFloat(monto).toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de pago">
                <Moment date={fecha_pago} format="DD/MM/YYYY" />
              </Descriptions.Item>
              <Descriptions.Item label="Concepto">{concepto}</Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </Col>
      </Row>
    </>
  )
}
