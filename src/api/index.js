import service from '@/utils/requests'

export const getcode = () => {
  return service({
    url: '/getcode',
    method: 'GET'
  })
}

export const postcode = (data) => {
  return service({
    url: '/postcode',
    method: 'POST',
    data
  })
}
