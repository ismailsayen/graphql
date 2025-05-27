export const querys = {
  infosUser: `
    {
        user{
            login
            attrs
        }
    }
    `,
  xp: `{
 transaction_aggregate(where:{type:{_eq:"xp"},eventId:{_eq:41}}){
  aggregate{
    sum{
      amount
    }
  }
}
}`,
  level: `{
  transaction(
    where: { type: { _eq: "level" }, eventId: { _eq: 41 } }
    order_by: { id: desc }
    limit: 1
  ) {
    amount
  }
}`,
  lastTwoProject: `{
  transaction(where:{type:{_eq:"xp"},eventId:{_eq:41},amount:{_gt:0}}
   order_by: { id: desc }
     limit: 2
  ){
    amount
    object{
      name
      type
    }
  }
}`,
  auditInfo: `{
  user {
    auditRatio
    audits(
      where: {closureType: {_in: [succeeded, failed]}, group: {eventId: {_eq: 41}}},
      order_by :{createdAt: desc}
    ) {
      closureType
      createdAt
      group {
        eventId
        captainLogin
        pathByPath {
          object {
            name
            type
          }
        }
      }
    }
  }
}`,
  user: `
{
  user{
    login
    lastName
    firstName
  }
}`
}