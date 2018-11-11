import React from 'react'
import { Query } from 'react-apollo'
import { Spinner } from '@blueprintjs/core'

const GraphQLQuery = ({ query, component: Comp }) => (
  <Query query={query}>
    {({ loading, error, data, refetch }) => {
      if (loading) return <Spinner size={25} />
      if (error) return <p>Error</p>

      return <Comp data={data} refetch={refetch} />
    }}
  </Query>
)

export default GraphQLQuery
