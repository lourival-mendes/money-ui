export const environment = {

  production: true,
  apiUrl: 'https://lourival-mendes-algamoney-api.herokuapp.com',

  tokenAllowedDomains: [RegExp("lourival-mendes-algamoney-api.herokuapp.com")],
  tokenDisallowedRoutes: [RegExp("\/oauth\/token")]

};
