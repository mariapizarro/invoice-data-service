import { IOClients } from '@vtex/api'

import InvoiceData from './invoiceData'
import InvoiceDataJanus from './invoiceDataJanus'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get invoiceData() {
    return this.getOrSet('invoiceData', InvoiceData)
  }
  public get invoiceDataJanus() {
    return this.getOrSet('invoiceDataJanus', InvoiceDataJanus)
  }
}
