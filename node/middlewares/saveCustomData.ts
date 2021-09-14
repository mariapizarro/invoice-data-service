import { json } from 'co-body'
import { pathOr } from 'ramda';

export async function saveCustomData(ctx: Context, next: () => Promise<any>) {
  try {
    const {
      clients: { customData: customDataClient },
      vtex: {
        route: { params },
      },
    } = ctx
    const body = await json(ctx.req)
    const { orderFormId } = params

    try {
      await customDataClient.save(`/api/checkout/pub/orderForm/${orderFormId}/customData/fiscaldata`, body);
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
