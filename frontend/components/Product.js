import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import Link from "next/link";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

export default function Product({ product }) {
  return (
    <ItemStyles>

      <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />  {/* ? checks if exists and if so it continues. Nested chaining. */}
      <Title>
        <Link href={`/product/${product.id}`}>
          {product.name}
        </Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* Add buttons to edit and delete item */}
    </ItemStyles>
  );
}