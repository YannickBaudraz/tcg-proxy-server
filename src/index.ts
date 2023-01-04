/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	POKEMONTCG_API_KEY: string;
}

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Allow-Headers': '*',
};

async function getTCGResource(resourcePath: string, apiKey: string) {
	const url = `https://api.pokemontcg.io/v2/${resourcePath}`;
	const headers = { 'X-Api-Key': apiKey };

	const response = await fetch(url, { headers });

	return response.body;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		if (request.method === 'OPTIONS')
			return new Response(null, { headers: corsHeaders });

		const tcgResourcePath = request.headers.get('X-TCG-RESOURCE');

		if (!tcgResourcePath)
			return new Response('Missing X-TCG-RESOURCE header', {
				status: 400,
				headers: corsHeaders,
			});

		const resource = await getTCGResource(
			tcgResourcePath,
			env.POKEMONTCG_API_KEY
		);

		return new Response(resource, {
			headers: {
				'content-type': 'application/json',
				...corsHeaders,
			},
		});
	},
};
