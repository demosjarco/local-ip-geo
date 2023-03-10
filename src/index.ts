export interface Env {
	GIT_HASH: string;
	NODE_ENV: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(
			JSON.stringify(
				{
					lat: Number(request.cf.latitude),
					long: Number(request.cf.longitude),
				},
				null,
				process.env.NODE_ENV === 'development' ? '\t' : undefined,
			),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	},
};
