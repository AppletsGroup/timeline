import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
// dayjs.locale('zh-cn')

export function fromNow(date2Format: string) {
  if (!date2Format) return ''
  return dayjs(date2Format).fromNow()
}

export function isAfter(a: string, b: string) {
  return dayjs(a).isAfter(dayjs(b))
}

export function getMonthAndDay(dateStr: string) {
  const date2Format = dayjs(dateStr)
  const month = date2Format.format('MMM')
  const day = date2Format.format('DD')
  return [month, day]
}
