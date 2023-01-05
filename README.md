# Pokemon Trading Card Game API Proxy

This project provides a simple proxy server for accessing the [Pokemon Trading Card Game API](https://pokemontcg.io/) using [Cloudflare Workers](https://workers.cloudflare.com/). The main reason for using a proxy server is to add an [API key](https://docs.pokemontcg.io/getting-started/authentication) to the request headers and having a better [rate limit](https://docs.pokemontcg.io/getting-started/rate-limits), which cannot be done from the frontend, for security reasons.

This project is built with [Node.js](https://nodejs.org/)/[TypeScript](https://www.typescriptlang.org/) and uses [`wrangler`](https://github.com/cloudflare/wrangler2) as the Cloudflare Workers CLI.

## Prerequisites

- A [Cloudflare](https://www.cloudflare.com/) account
- The [Cloudflare Workers CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- An API key for the Pokemon Trading Card Game API, which can be obtained by [signing up for a developer account](https://dev.pokemontcg.io/)

## Installation

1.  Clone the repository: `git clone https://github.com/yannickcpnv/tcg-proxy-server.git`
2.  Navigate to the directory: `cd tcg-proxy-server`
3.  Install the dependencies: `npm install`
4.  Log in to the Cloudflare Workers CLI by running the following command: `wrangler login`
5.  Set the `POKEMONTCG_API_KEY` environment variable to your Pokemon Trading Card Game API key. You can do this by running the following command: `echo <your-api-key> | wrangler secret put POKEMONTCG_API_KEY`
6.  Update the `account_id` value in `wrangler.toml` with your Cloudflare account ID

## Usage

To start the proxy server locally, run the following command:

```shell
wrangler dev --local
# or
npm run start
```

The proxy server will start running on port 8787. You can make requests to the Pokemon Trading Card Game API through the proxy by sending a request to `http://localhost:8787`. The endpoint for the API request should be specified in the `X-TCG-RESOURCE` header.

For example, to get a list of all cards of a Pokemon in the Pokemon Trading Card Game, send a request to `http://localhost:8787`, with the `X-TCG-RESOURCE` header set to `cards?q=name:<pokemon_name>`.

To deploy the proxy server to Cloudflare Workers, run the following command:

```shell
wrangler publish
# or
npm run deploy
```

This will build and deploy the proxy server to Cloudflare Workers. The proxy server will be accessible at a URL provided by Cloudflare, such as `https://your-worker-name.your-domain.workers.dev`.

You can make requests to the Pokemon Trading Card Game API through the deployed proxy by sending a request to `https://your-worker-name.your-domain.workers.dev`, with the endpoint specified in the `X-TCG-RESOURCE` header.

---

Written with the help of ChatGPT ❤️
