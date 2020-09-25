I consider using node-cache or small caching util with redis 

1. We'll get all the data needed from 3rd part API (look at the `getData.ts lines 10-13`)

2. Format the data. `getData.ts lines 15-54` we have 2 maps with users and posts. Both, user and post object will look like `interfaces.js` described.

3. Finally we can store it in redis/node-cache with some expiration time

4. On each `http://localhost:[port]/get_data/:searchStr?` request we will check the cache data first, if data expired/not-stored do the 1-3 steps.

5. Do the search part and final formatting. In our case it's the `getData.ts lines 56-91`

