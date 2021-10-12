import React from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { pageLoading } from '../../../../redux/ducks/admin/users'

export const TableUsers = () => {
  const dispatch = useDispatch()
  const { data, loading, page } = useSelector((state) => state.adminUser)

  const [filters, setFilters] = React.useState({
    page: 1,
    search: ''
  })

  React.useEffect(() => {
    dispatch(pageLoading({ ...filters }))
  }, [dispatch, filters])

  // columns
  const columns = React.useMemo(() => [
    {
      key: 'usuario_id',
      title: 'Usuario',
      dataIndex: 'usuario_id'
    },
    {
      key: 'nomuser',
      title: 'Nombres',
      dataIndex: 'nomuser'
    },
    {
      key: 'apeuser',
      title: 'Apellidos',
      dataIndex: 'apeuser'
    },
    {
      key: 'nombre',
      title: 'Perfil',
      dataIndex: 'nombre'
    }
  ])

  return (
    <>
      <Table
        dataSource={data}
        loading={loading}
        columns={columns}
        rowKey="usuario_id"
        pagination={{
          ...page
        }}
      />
    </>
  )
}
