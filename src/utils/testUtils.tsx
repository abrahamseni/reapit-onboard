import { render } from '@testing-library/react'
import { rest } from 'msw'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const handlers = [
  rest.get('*/negotiator', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'mocked-react-query',
      }),
    )
  }),
]

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

export function renderWithClient(jsxElement: React.ReactElement) {
  const testQueryClient = createTestQueryClient()
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{jsxElement}</QueryClientProvider>,
  )

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => {
      rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>)
    },
  }
}

export const createWrapper = () => {
  const testQueryClient = createTestQueryClient()
  return ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  }
}
