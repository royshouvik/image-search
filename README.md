# Image Search Abstraction Layer

## Demo
`https://img-search.gomix.me/api/imagesearch/lolcats`

## Uses

1. Search for an image. For example, to search for `lolcats` use `https://img-search.gomix.me/api/imagesearch/lolcats`.
2. Paginate through the result by appending a offset query parameter. For example, to go to second page of the search results, use `https://img-search.gomix.me/api/imagesearch/lolcats?offset=2`.
3. View the latest search terms at `https://img-search.gomix.me/api/latest/imagesearch`.

## User Stories

- I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
- I can paginate through the responses by adding a ?offset=2 parameter to the URL.
- I can get a list of the most recently submitted search strings.
Built by Shouvik Roy