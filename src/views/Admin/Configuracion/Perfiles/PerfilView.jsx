import React, { useEffect } from 'react'
import { Tabs, PageHeader, Button, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import { ModulosTable } from './ModulosTable'
import { UsuariosTable } from './UsuariosTable'
import {
  findById,
  deletePerfilAction,
  addModuloPerfilServer
} from '../../../../redux/ducks/admin/perfiles'

const { TabPane } = Tabs

const { confirm } = Modal

export const PerfilView = () => {
  const { id } = useParams()
  const history = useHistory()

  const {
    current: { perfil, modulos, usuarios, loading, dataModulos }
  } = useSelector((state) => state.adminPerfiles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findById({ id }))
  }, [id, dispatch])

  const addModuloPerfil = (modulo) => {
    dispatch(addModuloPerfilServer({ modulo, id }))
  }
  function showDeleteConfirm() {
    confirm({
      title: '¿Esta seguro que desea eliminar el perfil?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deletePerfilAction(id))
        history.push('/admin/a/perfiles')
      }
    })
  }

  return (
    <>
      <PageHeader
        title={`Perfil - ${perfil.nombre}`}
        onBack={() => window.history.back()}
        extra={[
          <Button
            key="1"
            danger
            type="primary"
            onClick={showDeleteConfirm}
            icon={<DeleteOutlined />}
            disabled={!(usuarios.length === 0 && modulos.length === 0)}
          >
            Eliminar
          </Button>
        ]}
        footer={
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Modulos" key="1">
              <ModulosTable
                loading={loading}
                modulos={modulos}
                data={dataModulos}
                add={addModuloPerfil}
                isAdmin={perfil.is_admin}
              />
            </TabPane>
            <TabPane tab="Usuarios" key="2" disabled={!perfil.is_admin || usuarios.length === 0}>
              <UsuariosTable
                loading={loading}
                usuarios={usuarios}
                isAdmin={perfil.is_admin}
              />
            </TabPane>
          </Tabs>
        }
      />
    </>
  )
}
