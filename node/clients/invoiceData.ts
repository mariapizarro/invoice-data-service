import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class InvoiceData extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, { ...options })
  }

  public async save(path: string, body: any, authToken: any): Promise<any> {
    return await this.http.post(path.toString(),
      body,
      {
        headers: {
          VtexIdclientAutCookie: authToken,
          Accept: 'application/json',
          'Proxy-Authorization': authToken,
          Authorization: authToken,
        },
      })
  }
}
