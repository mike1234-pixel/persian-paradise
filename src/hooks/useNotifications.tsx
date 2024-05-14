import { notification } from 'antd'
import { type IconType } from 'antd/es/notification/interface'

export const useNotifications = () => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (message: string, type: IconType) => {
    api.open({
      message,
      duration: 3,
      type
    })
  }
  return { openNotification, contextHolder }
}
