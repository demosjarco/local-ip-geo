import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';
import { after, before, describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

describe('Worker', () => {
	let worker: UnstableDevWorker;

	before(async () => {
		worker = await unstable_dev('src/index.ts', { local: false, experimental: { disableExperimentalWarning: true } });
	});

	after(async () => {
		await worker.stop();
	});

	it('should return Decimal Degrees (DD)', async () => {
		const resp = await worker.fetch();
		if (resp) {
			const json = await resp.json();

			assert.deepStrictEqual(Object.keys(json).includes('lat'), true);
			assert.deepStrictEqual(typeof json.lat === 'number', true);
			assert.deepStrictEqual(Object.keys(json).includes('long'), true);
			assert.deepStrictEqual(typeof json.long === 'number', true);
		}
	});
});
