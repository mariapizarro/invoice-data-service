import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class InvoiceData extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super("", ctx, {
      ...options,
      headers: {
        ...{ Accept: "application/json" },
        "X-Vtex-Use-Https": "true",
      },
    });
  }

  public async save(path: string, body: any): Promise<any> {

    console.log('## init save invoice data', path.toString(), body)

    let response = await this.http.put(path.toString(), body);

    console.log('## response', response)

    return response
  }
}
