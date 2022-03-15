import { gql } from "@apollo/client";

export const categoriesQuery = gql`
  query GetCategories {
    categories {
      name
      products {
        name
        gallery
        id
      }
    }
  }
`;

export const productQuery = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      name
    }
  }
`;
