import { useQuery } from "@apollo/client";
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import Head from 'next/head';
import styled from "styled-components";

// "object-fit: contain" prevents image skewing
const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`

// Gets a single product where the id matches the below and returns the name, price and description
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: {
      id: $id
    }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id: id
    }
  });
  if(loading) return <p>Loading...</p>
  if(error) return <DisplayError error={error}/>;
  const { Product } = data;
  console.log(Product);
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img src={Product.photo.image.publicUrlTransformed} alt={Product.photo.altText} />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
}