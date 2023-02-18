export interface Env {
	GIT_HASH: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(JSON.stringify(request.headers, null, process.env.NODE_ENV === 'development' ? '\t' : undefined));
	},
};
