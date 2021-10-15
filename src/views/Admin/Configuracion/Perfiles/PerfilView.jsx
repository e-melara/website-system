import React, { useEffect } from 'react'
import { Tabs, PageHeader } from 'antd'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ModulosTable } from './ModulosTable'
import { UsuariosTable } from './UsuariosTable'
import {
  findById,
  addModuloPerfilServer
} from '../../../../redux/ducks/admin/perfiles'

const { TabPane } = Tabs

export const PerfilView = () => {
  const { id } = useParams()
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

  return (
    <>
      <PageHeader
        title={`Perfil - ${perfil.nombre}`}
        onBack={() => window.history.back()}
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
            <TabPane tab="Usuarios" key="2" disabled={!perfil.is_admin}>
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
