import React from "react";
import { gql, useQuery } from "@apollo/client";

const USERS_QUERY = gql`
  query USERS_QUERY {
    allUsers {
      name
    }
  }
`;

interface User {
  name: string;
  id: number;
}

export default function Users() {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>loading....</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data.allUsers.map((user: User) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
