export interface Env {
	GIT_HASH: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let tempHeaders: Record<string, string> = {};
		request.headers.forEach((value, key) => {
			tempHeaders[key] = value;
		});
		return new Response(JSON.stringify(tempHeaders, null, process.env.NODE_ENV === 'development' ? '\t' : undefined));
	},
};
