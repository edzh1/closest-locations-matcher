# closest-locations-matcher

This node.js app allows you to perform the following operations:

1. Call an endpoint and pass an array of locations
2. For every location in the array, calculate which location from the same array is closest
3. Get the list of pairs

## Considerations

- One or more locations might not exist
- Speed of the endpoint
- Payloads can contain 50-100 locations
- Locations might not be formatted. e.g. "The Statue of Liberty"
- Feel free to add additional features if you have the time and inspiration
