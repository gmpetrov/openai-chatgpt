export enum UIState {
	INIT,
	ASK_API_KEY,
	READY,
	WAITING_RESPONSE,
	SHOWING_RESPONSE,
}

export type Message = {
	text: string;
	from: "user" | "ai";
	id: string;
	conversationId?: string;
	parentMessageId?: string;
};

export enum Colors {
	USER = "green",
	AI = "magenta",
	AI_GRADIENT = "retro",
}

export enum StorageKeys {
	OPENAI_API_KEY = "OPENAI_API_KEY",
}

export enum CliFlags {
	RESET = "reset",
}
