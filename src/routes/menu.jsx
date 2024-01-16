import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'

const mainRoute = `re`

export const menus = [
  {
    label: 'add new',
    icon: <InfoCircleOutlined />,
    key: `/${mainRoute}/create`,
  },
  {
    label: 'List',
    icon: <UserOutlined />,
    key: `/${mainRoute}/`,
  },
]

export const Authmenus = [
  {
    label: 'List',
    icon: <UserOutlined />,
    key: `/auth`,
  },
]
