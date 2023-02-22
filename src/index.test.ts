import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

describe('Worker', () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev('src/index.ts', {
			local: false,
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it('should return Decimal Degrees (DD)', async () => {
		const resp = await worker.fetch();
		if (resp) {
			const json = await resp.json();

			expect(json).toHaveProperty('lat');
			expect(json.lat).toBeTypeOf('number');
			expect(json).toHaveProperty('long');
			expect(json.long).toBeTypeOf('number');
		}
	});
});
