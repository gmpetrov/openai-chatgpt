export enum UIState {
	INIT,
	ASK_API_KEY,
	ASK_API_TYPE,
	ASK_ACCESS_TOKEN,
	READY,
	WAITING_RESPONSE,
	SHOWING_RESPONSE,
}

export enum ApiType {
	OFFICIAL = "official",
	UNOFFICIAL = "unofficial",
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
	ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY",
	API_TYPE = "API_TYPE",
}

export enum CliFlags {
	RESET = "reset",
}
