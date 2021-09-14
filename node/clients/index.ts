import { IOClients } from '@vtex/api'

import CustomData from './customData'
import InvoiceData from './invoiceData'
import VtexId from './vtexid'
export class Clients extends IOClients {
  public get customData() {
    return this.getOrSet('customData', CustomData)
  }
  public get invoiceData() {
    return this.getOrSet('invoiceData', InvoiceData)
  }
  public get vtexid() {
    return this.getOrSet('vtexid', VtexId)
  }
}
