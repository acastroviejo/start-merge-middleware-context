import { createFileRoute } from '@tanstack/react-router'
import { createMiddleware, createServerFn } from '@tanstack/start'

const a = createMiddleware().server(async ({ next }) => {
  return next({
    context: {
      session: 'string',
    },
  })
})

const b = createMiddleware()
  .middleware([a])
  .server(async ({ next }) => {
    return next({
      context: {
        session: 100,
      },
    })
  })

const fn = createServerFn()
  .middleware([b])
  .handler(async ({ context }) => {
    return context.session
    // context.session here is typed as `string | number`
    // but should be just `number`
  })

export const Route = createFileRoute('/')({
  component: function Component() {
    const handleClick = async () => {
      const res = await fn()
      console.log(res)
    }

    return (
      <div>
        <div>homepage</div>
        <button onClick={handleClick}>call fn</button>
      </div>
    )
  },
})
