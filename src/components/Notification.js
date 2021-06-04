// @flow
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  msg: string,
  type: 'success' | 'error',
  dispatch: Function,
}

export const Notification = () => {
  const { msg, type } = useSelector((state) => state.notification)

  const [open, setOpen] = useState(false)

  const toast = useRef(null)

  if (msg.length > 0 && !open) {
    toast.current.show({ severity: type, summary: msg, closable: false })
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 7000)
  }

  return    <Toast ref={toast} position="bottom-right" />
}

export default Notification
