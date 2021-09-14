import { json } from 'co-body'
import { pathOr } from 'ramda';

export async function saveInvoiceData(ctx: Context, next: () => Promise<any>) {
  try {
    const {
      clients: { invoiceData: invoiceDataClient },
      vtex: {
        route: { params },
        authToken
      },
    } = ctx

    const body = await json(ctx.req)
    const { orderFormId } = params

    /*
    --> PRUEBAS
    const { token } = await apps.getAppSettings(
      process.env.VTEX_APP_ID as string
    )
    console.log('## token', token)

    -- let authenticatedUser: AuthenticatedUser | undefined
    -- authenticatedUser = await vtexid.getAuthenticatedUser(storeUserAuthToken ?? adminUserAuthToken ?? authToken)

    --- const vtexIdToken = ctx.cookies.get('VtexIdclientAutCookie') || ctx.get('VtexIdclientAutCookie')

    ---
    if (sessionToken) {
      const { session } = ctx.clients
      const sessionPayload = await session.getSession(sessionToken, ['*'])
      const isImpersonated = !!sessionPayload?.sessionData?.namespaces?.impersonate?.storeUserId?.value
      const vtexIdClientCookieName = isImpersonated ? 'VtexIdclientAutCookie' : `VtexIdclientAutCookie_${account}`
      const VtexIdclientAutCookie = sessionPayload?.sessionData?.namespaces?.cookie?.[vtexIdClientCookieName]?.value
      console.log('## VtexIdclientAutCookie', VtexIdclientAutCookie)
    }

    console.log('## sessionToken', sessionToken)
    */

    try {
      await invoiceDataClient.save(`/api/checkout/pub/orderForm/${orderFormId}/attachments/invoiceData`, body, authToken);
      ctx.status = 200
      ctx.body = {
        response: 'Saved successfully!'
      }
    } catch (error) {
      console.log('An error has occurred, ', error.toString())
      ctx.status = 500
      ctx.body = {
        error: pathOr('An error has occurred', ['response', 'data'], error),
        message: error.toString(),
        status: pathOr(200, ['response', 'status'], error),
      }
      throw error
    }

    await next()
  } catch (error) {
    console.log('An error has occurred, ', error.toString())
    ctx.status = 500
    ctx.body = {
      error: pathOr('An error has occurred', ['response', 'data'], error),
      message: error.toString(),
      status: pathOr(200, ['response', 'status'], error),
    }
  }
}
