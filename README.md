# closest-locations-matcher

The speed of the endpoint depends on the locations count (there is a delay to pass API rules), because for this task I'm using the public API (it is possibe to deploy your own server, but it takes time).

This service accepts POST request to the `/location-pairs` endpoint with following data.

```
{
	"locations": [
		{ "lat": 40.6892532, "lon": -74.0445481714432, "name": "The statue of liberty" },
		{ "lat": 52.516272, "lon": 13.377722, "name": "Brandenburg Gate" },
		{ "lat": 51.515, "lon": 7.453619, "name": "Leonie-Reygers-Terrasse" }
	]
}
```

For this task I'm using the name of an location to check the existence of this object in the real world via open street map.

---

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
