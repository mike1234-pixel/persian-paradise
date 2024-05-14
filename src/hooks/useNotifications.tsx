import { notification } from 'antd'

export const useNotifications = () => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 3
    })
  }
  return { openNotification, contextHolder }
}
