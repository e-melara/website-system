import React from 'react'
import { Dropdown, Menu, Input, Col, Row } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'

const AsesoriaHeader = ({ typeUser, handlerSearch, handlerFilterDropdown }) => {
  const menu = (
    <Menu onClick={handlerFilterDropdown}>
      {typeUser === 2 && (
        <>
          <Menu.Item key="1">Iniciandos</Menu.Item>
          <Menu.Item key="2">Pendientes</Menu.Item>
          <Menu.Item key="4">Validados</Menu.Item>
        </>
      )}
      {typeUser === 1 && (
        <>
          <Menu.Item key="5">UNI</Menu.Item>
          <Menu.Item key="4">Impago</Menu.Item>
        </>
      )}

      <Menu.Divider />
      <Menu.Item key="3">Limpiar</Menu.Item>
    </Menu>
  )

  const Search = Input.Search

  return (
    <header className="p-4">
      <Row>
        <Col flex={1}>
          <h2>Solicitudes</h2>
        </Col>
        <Col flex={4} className="d-flex justify-content-end align-items-center">
          <Dropdown overlay={menu}>
            <span
              style={{
                fontSize: '1rem',
                color: 'var(--antd-wave-shadow-color)',
                cursor: 'pointer'
              }}
              className="ant-dropdown-link"
            >
              Filtrar por <DownOutlined />
            </span>
          </Dropdown>
          <div style={{ marginLeft: 10 }}>
            <Search
              size="large"
              allowClear
              style={{ width: 300 }}
              onSearch={handlerSearch}
              placeholder="Buscar ...."
              enterButton={<SearchOutlined />}
            />
          </div>
        </Col>
      </Row>
    </header>
  )
}

export default AsesoriaHeader
