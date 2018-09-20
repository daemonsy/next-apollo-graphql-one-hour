
This repository uses Next.js, Apollo Client, Bulma and Github's V4 API to render a UI showing the people who starred a repository.

This is coded in one hour to make a point that it's much easier to use GraphQL to build UIs because of the was you can get the exact data you need in one request.

None of this is good or production ready code.

Next.js is awesome.

## To run this:
1. Get a [personal access token](https://github.com/settings/tokens) that has enough scopes to run the GraphQL query.
2. Add the token to `init-apollo.js` file under `<your_personal_access_token>`
2. `yarn`
3. `yarn run dev`
