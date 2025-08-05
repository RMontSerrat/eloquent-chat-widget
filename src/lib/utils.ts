import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

// Initialize dayjs with plugins
dayjs.extend(relativeTime)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format timestamp for display with relative time
 * @param timestamp - Date object to format
 * @returns Formatted string (e.g., "Just now", "5m ago", "2h ago")
 */
export function formatTimestamp(timestamp: Date): string {
  const now = dayjs()
  const time = dayjs(timestamp)
  const diffMinutes = now.diff(time, 'minute')
  const diffHours = now.diff(time, 'hour')
  const diffDays = now.diff(time, 'day')

  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return time.format('MM/DD/YYYY')
}

/**
 * Check if message is recent (within 5 minutes)
 * @param timestamp - Date object to check
 * @returns Boolean indicating if message is recent
 */
export function isRecentMessage(timestamp: Date): boolean {
  const now = dayjs()
  const time = dayjs(timestamp)
  return now.diff(time, 'minute') < 5
}

/**
 * Get current timestamp as Date object
 * @returns Current Date object
 */
export function getCurrentTimestamp(): Date {
  return dayjs().toDate()
}

/**
 * Format date for display (e.g., in last saved info)
 * @param date - Date object to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return dayjs(date).format('MMM DD, YYYY HH:mm')
}

/**
 * Get relative time from now
 * @param date - Date object to compare
 * @returns Relative time string (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(date: Date): string {
  return dayjs(date).fromNow()
}