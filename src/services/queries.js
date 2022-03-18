import { gql } from "@apollo/client";

export const categoriesQuery = gql`
  query GetCategories {
    categories {
      name
      products {
        id
        attributes {
          name
          items {
            value
            displayValue
            id
          }
        }

        brand
        description
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

// export const productQuery = gql`
//   query GetProduct($id: String!) {
//     product(id: $id) {
//       name
//     }
//   }
// `;

export const currenciesQuery = gql`
  query GetCurrencies {
    currencies {
      symbol
      label
    }
  }
`;
