import { gql } from "apollo-server-express";

export default gql`
  type Like {
    item: Item!
    user: User!
  }
`;
