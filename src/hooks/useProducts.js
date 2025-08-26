import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../services/products'

export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
    keepPreviousData: true,
  })
}

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  })
}

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: productService.getFeaturedProducts,
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}

export const useTrendingProducts = () => {
  return useQuery({
    queryKey: ['trending-products'],
    queryFn: productService.getTrendingProducts,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useTopRatedProducts = () => {
  return useQuery({
    queryKey: ['top-rated-products'],
    queryFn: productService.getTopRatedProducts,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => productService.updateProduct(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}