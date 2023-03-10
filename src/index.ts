export interface Env {
	GIT_HASH: string;
	NODE_ENV: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let tempCf:Record<string,string> = {};
		for (const index in Object.keys(request.cf)) {
			tempCf[Object.keys(request.cf)[index]] = JSON.stringify(Object.values(request.cf)[index], null, '\t');
		}
		return new Response(
			JSON.stringify(
				{
					lat: Number(request.cf.latitude) || Number(request.headers.get('cf-iplatitude')),
					long: Number(request.cf.longitude) || Number(request.headers.get('cf-iplongitude')),
					cf: tempCf,
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
