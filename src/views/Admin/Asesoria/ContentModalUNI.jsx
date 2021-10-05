import React from 'react'
import Moment from 'react-moment'
import { Row, Col, Table, Divider, PageHeader, Descriptions } from 'antd'

import { FilePdfTwoTone, FileImageTwoTone } from '@ant-design/icons'

const columns = [
  {
    key: 'descripcion',
    dataIndex: 'descripcion',
    title: 'Concepto',
    align: 'left'
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
              <Row className="tabs" gutter={[24, 24]}>
                <Col span={24}>
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
                            <h5>Total</h5>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell align="right">
                            <h5>$ {total.toFixed(2)}</h5>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      )
                    }}
                  />
                </Col>
                <Col span={10}>
                  <h4>Archivos</h4>
                  <ul className="ul-files">
                    {archivos.map(({ url, tipo, fileUrl }, index) => {
                      return (
                        <li key={url}>
                          <a
                            rel="noreferrer"
                            href={`${fileUrl}`}
                            target="_blank"
                          >
                            {tipo === 'pdf' ? (
                              <>
                                <FilePdfTwoTone
                                  style={{ fontSize: '1.8rem' }}
                                  size="large"
                                />
                                <span>Archivo {index + 1}</span>
                              </>
                            ) : (
                              <>
                                <FileImageTwoTone
                                  style={{ fontSize: '1.8rem' }}
                                  size="large"
                                />
                                <span>Archivo {index + 1}</span>
                              </>
                            )}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
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
                  banco.is_referido
                    ? '# de referencia'
                    : 'Cuenta bancaria a nombre de'
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
