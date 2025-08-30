import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '../services/analytics'

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'dashboard'],
    queryFn: analyticsService.getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}