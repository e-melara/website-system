import React from 'react'
const icons = require('@ant-design/icons')

export const Icon = React.memo(({ type, ...rest }) => {
  const Component = icons[type] || icons.BoxPlotOutlined
  return <Component {...rest} />
})
