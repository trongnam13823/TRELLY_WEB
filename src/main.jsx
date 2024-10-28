import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import ThemeHandler from './components/Theme/ThemeHandler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'react-toastify/dist/ReactToastify.css'
import './style.css'

const toastConfig = {
  position: 'bottom-right',
  theme: 'colored',
  autoClose: 3000,
  closeOnClick: true,
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ThemeHandler />
    <ToastContainer {...toastConfig} newestOnTop />
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
