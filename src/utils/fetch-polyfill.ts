(async () => {
	const { fetch, Headers, Request, Response } = await import("node-fetch").then(
		(mod) => {
			const { Headers, Request, Response } = mod;
			return {
				Headers,
				Request,
				Response,
				fetch: mod.default,
			};
		}
	);

	if (!globalThis.fetch) {
		(globalThis as any).fetch = fetch;
		(globalThis as any).Headers = Headers;
		(globalThis as any).Request = Request;
		(globalThis as any).Response = Response;
	}
})();
