
import { IProduct, Product } from "./schema/product";


export class scvRepository {

  async findByIdAsync(requestId: string): Promise<IProduct[] | null> {
    const products = await Product.find({ requestId }).exec();
 
    return products;
  }
}
