import React from 'react'
import { Table, Tag } from 'antd'

const objectStatus = {
  1: <Tag color="#108ee9">Activado</Tag>,
  0: <Tag color="#f50">Descativado</Tag>
}

const columns = [
  {
    dataIndex: 'usuario_id',
    title: 'Usuario',
    key: 'usuario_id',
    align: 'center'
  },
  {
    dataIndex: 'nomuser',
    title: 'Nombres',
    key: 'nomuser',
    align: 'center'
  },
  {
    dataIndex: 'apeuser',
    title: 'Apellidos',
    key: 'apeuser',
    align: 'center'
  },
  {
    dataIndex: 'estado',
    key: 'estado',
    title: 'Estado',
    align: 'center',
    render: (estado) => objectStatus[estado]
  }
]

export const UsuariosTable = ({ usuarios, loading }) => {
  return (
    <>
      <div className='p-4'>
        <Table
          style={{ padding: '40px 0' }}
          bordered
          rowKey="id"
          size="small"
          columns={columns}
          pagination={false}
          dataSource={usuarios}
        />
      </div>
    </>
  )
}
