import React from 'react'
import { Table, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export const FormAsesoriaTableAranceles = ({
  aranceles,
  handlerRemoveArancel
}) => {
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
      align: 'center',
      render: (precio) => <span>$ {parseFloat(precio).toFixed(2)}</span>
    },
    {
      dataIndex: 'actions',
      title: '',
      width: '100px',
      align: 'center',
      render: (_, record) => {
        return (
          <Button
            danger
            size="middle"
            type="primary"
            disabled={!record.isRemove}
            onClick={() => handlerRemoveArancel(record)}
            icon={<DeleteOutlined />}
          />
        )
      }
    }
  ]
  return (
    <Table
      bordered
      size="small"
      rowKey="idarancel"
      columns={columns}
      pagination={false}
      dataSource={aranceles}
      summary={(pageData) => {
        let totalPrice = 0
        pageData.forEach(({ precio }) => {
          totalPrice += precio
        })
        return (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell>
                <h5>Total</h5>
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={2}>
                <h5>$ {totalPrice.toFixed(2)}</h5>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )
      }}
    />
  )
}
