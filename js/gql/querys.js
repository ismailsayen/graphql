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
  transaction(where:{type:{_eq:"xp"},eventId:{_eq:41}}
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
auditInfo:` {
  user{
    auditRatio
    
    audits(where:{closureType:{_in:[succeeded, failed]}}){
      closureType
      
      group{
        captainLogin
        createdAt
        pathByPath{
          object{
            name
          }
        }
      }
    }
  }
}`
}