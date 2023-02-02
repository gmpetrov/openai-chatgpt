import { Message, StorageKeys } from "../types";

import getConfig from "./get-config";

async function sendMessage(msg: Message) {
	const { ChatGPTAPI } = await import("chatgpt");
	const config = await getConfig();

	const openaiApiKey = config.get(StorageKeys.OPENAI_API_KEY);

	const api = new ChatGPTAPI({
		apiKey: openaiApiKey,
	});

	return api.sendMessage(msg.text, {
		conversationId: msg?.conversationId,
		parentMessageId: msg?.parentMessageId,
	}) as any;
}

export default sendMessage;
