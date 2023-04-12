import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { IProduct } from '@/interfaces/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceProducts extends DataSource<IProduct> {
  data = new BehaviorSubject<IProduct[]>([]);
  dataOriginal:IProduct[] = []

  override connect(
    collectionViewer: CollectionViewer
  ): Observable<readonly IProduct[]> {
    return this.data;
  }

  init(products: IProduct[]) {
    this.data.next(products);
    this.dataOriginal = products
  }

  getTotal() {
    const products = this.data.getValue();

    return products
      .map((item) => item.price)
      .reduce((price, total) => price + total, 0);
  }

  update(id:IProduct["id"],changes:Partial<IProduct>) {
    const product = this.data.getValue()

    const productIndex = product.findIndex(item => item.id === id)
    if(productIndex !== -1 )  {
      product[productIndex] = {...product[productIndex],...changes}
      this.data.next(product)
    }
  }

  find(query:string) {
   const resp =  this.dataOriginal.filter(item => item.title.toLocaleLowerCase().includes(query.toLowerCase()))
   this.data.next(resp)
  }

  override disconnect(collectionViewer: CollectionViewer): void {
    this.data.complete()
    this.data.unsubscribe()
  }
}
