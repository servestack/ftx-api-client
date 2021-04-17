# FTX API CLIENT
  Use this lib to call ftx api, without dealing the complex authentication mechanism

## Installing / Getting started
```shell
npm install ftx-api-client --save
```

After installation, you required FTX Account's API_KEY & API_SECRET
also optional Subaccount


Initialize the Api Client 

```js
const ftxApiClient = new require('ftx-api-client')({
    api_key: "<ftx-api-key>",
    api_secret: "<ftx-api-secret>",
    subaccount: "<ftx-subaccount>" // optional
});
```

Call any api using `call` method, which accept an option as parameter,
and options has following properties

- resource : FTX API Resource to call like `/account`
- method   : API Method like POST GET PUT DELETE
- data     : (optional) data object for POST & PUT request


Let's call api to get the account info

```js
ftxApiClient({
    resource: '/account',
    method: 'GET'
})
.then(console.log)
.catch(console.error)
```

