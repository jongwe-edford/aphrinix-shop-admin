import { Category } from '../../categories/response/category';

export interface NewProductRequest {
  shopId?: string;
  name?: string;
  quantity?: number;
  categories?: string[];
  tags?: Set<String>;
  colors?: Set<String>;
  sizes?: Set<string>;
  shortDescription?: string;
  longDescription?: string;
  price?: number;
  total?: number;
}
