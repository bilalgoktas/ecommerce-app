import { gql } from "@apollo/client";

export const categoriesQuery = gql`
  query GetCategories {
    categories {
      name
      products {
        name
        gallery
        id
        prices {
          amount
          currency {
            symbol
            label
          }
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
