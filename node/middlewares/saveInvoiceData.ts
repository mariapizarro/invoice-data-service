import { json } from 'co-body'
import { pathOr } from 'ramda';

export async function saveInvoiceData(ctx: Context, next: () => Promise<any>) {
  try {
    const {
      clients: { invoiceDataJanus: invoiceDataClient },
      vtex: {
        route: { params },
      },
    } = ctx
    const body = await json(ctx.req)
    const { orderFormId } = params

    //? invoiceData POST -> /api/checkout/pub/orderForm/${orderFormId}/attachments/invoiceData
    //? fiscalData  PUT  -> /api/checkout/pub/orderForm/${orderFormId}/customData/fiscaldata

    try {
      await invoiceDataClient.save(`/api/checkout/pub/orderForm/${orderFormId}/customData/fiscaldata`, body);
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
    ctx.status = error.response.status
    ctx.body = {
      error: pathOr('An error has occurred', ['response', 'data'], error),
      message: error.toString(),
      status: pathOr(200, ['response', 'status'], error),
    }
  }
}
