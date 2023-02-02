import { Message, StorageKeys } from "../types";

import getConfig from "./get-config";

async function sendMessage(msg: Message) {
	// If ChatGPTAPI instance is re-created, conversation is not working
	if (!(global as any).openaiApi) {
		const { ChatGPTAPI } = await import("chatgpt");
		const config = await getConfig();

		const openaiApiKey = config.get(StorageKeys.OPENAI_API_KEY);

		(global as any).openaiApi = new ChatGPTAPI({
			apiKey: openaiApiKey,
		});
	}

	return (global as any).openaiApi.sendMessage(msg.text, {
		conversationId: msg?.conversationId,
		parentMessageId: msg?.parentMessageId,
	}) as any;
}

export default sendMessage;
