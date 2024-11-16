import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  ScrollRestoration,
  Outlet,
} from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import styles from '~/styles/index.css?url'

const RootDocument = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}

type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  meta: () => {
    return [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start',
      },
    ]
  },
  links: () => {
    return [
      {
        rel: 'stylesheet',
        href: styles,
      },
    ]
  },
  component: function Component() {
    return (
      <RootDocument>
        <Outlet />
      </RootDocument>
    )
  },
})
