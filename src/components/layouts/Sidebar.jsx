import React from 'react'
import { Menu } from 'antd'
import { groupBy } from 'lodash'
import { Icon } from '../common'
import { Link, useLocation } from 'react-router-dom'


const { SubMenu } = Menu

export const SiderBar = React.memo(({ routes, theme }) => {
  const location = useLocation()
  const groupByRoutes = groupBy(routes, 'root')

  return (
    <>
      <div className="logo">
        <img
          src={`https://utla.sfo3.digitaloceanspaces.com/assets/imgs/utla.png`}
          alt="imgs for logo"
        />
      </div>
      <Menu theme={theme} mode="inline" selectedKeys={[location.pathname]}>
        <Menu.Item icon={<Icon type="HomeFilled" />} key="/">
          <Link to="/">{'Inicio'}</Link>
        </Menu.Item>
        {routes &&
          Object.keys(groupByRoutes).sort().map((key, index) => {
            if (key !== '-') {
              const IconSubMenu = groupByRoutes[key][0]['icon_root']
              return (
                <SubMenu
                  title={key}
                  key={`${key}-${index}`}
                  icon={<Icon type={IconSubMenu} />}
                >
                  {groupByRoutes[key].map(({ short_name, icon, nombre }) => {
                    return (
                      <Menu.Item key={short_name} icon={<Icon type={icon} />}>
                        <Link to={short_name}>{nombre}</Link>
                      </Menu.Item>
                    )
                  })}
                </SubMenu>
              )
            } else {
              return groupByRoutes[key].map(
                ({ short_name, icon_root, nombre }) => (
                  <Menu.Item key={short_name} icon={<Icon type={icon_root} />}>
                    <Link to={short_name}>{nombre}</Link>
                  </Menu.Item>
                )
              )
            }
          })}
      </Menu>
    </>
  )
})
