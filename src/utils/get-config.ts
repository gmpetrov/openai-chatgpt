async function getConfig() {
	const Conf = await import("conf").then((mod) => mod.default);

	const config = new Conf({ projectName: "openai-chatgpt" });

	return config as any;
}

export default getConfig;
