import { gql } from "@apollo/client";

export const categoriesQuery = gql`
  query GetCategories {
    categories {
      name
      products {
        id
        attributes {
          type
          name
          items {
            value
            displayValue
            id
          }
        }

        brand

        inStock
        name
        gallery
        prices {
          currency {
            symbol
            label
          }
          amount
        }
      }
    }
  }
`;

export const productQuery = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      brand
      name
      id
      gallery
      description
      attributes {
        name
        type
        items {
          displayValue
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

export const currenciesQuery = gql`
  query GetCurrencies {
    currencies {
      symbol
      label
    }
  }
`;
