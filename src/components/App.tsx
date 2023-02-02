import React, { FC, useCallback, useEffect, useMemo, useReducer } from "react";
import { Box } from "ink";
import History from "./History";
import AskApiKey from "./AskApiKey";
import Query from "./Query";
import { Message, StorageKeys, UIState } from "../types";
import sendMessage from "../utils/send-message";
import getConfig from "../utils/get-config";
import WaitingResponse from "./WaitingResponse";
import { v4 as uuidv4 } from "uuid";

import Init from "./Init";

type State = {
	uiState: UIState;
	messages: Message[];
};

const App: FC<{ reset?: boolean }> = ({ reset = false }) => {
	const [state, setState] = useReducer(
		(state: State, newState: Partial<State>) => ({
			...state,
			...newState,
		}),
		{
			uiState: UIState.INIT,
			messages: [],
		}
	);

	useEffect(() => {
		(async () => {
			const config = await getConfig();

			const openaiApiKey = config.get(StorageKeys.OPENAI_API_KEY);

			if (!openaiApiKey || reset) {
				if (openaiApiKey) {
					config.delete(StorageKeys.OPENAI_API_KEY);
				}

				return setState({
					uiState: UIState.ASK_API_KEY,
				});
			}

			return setState({
				uiState: UIState.READY,
			});
		})();
	}, []);

	const onSubmitApiKey = useCallback(
		async (apiKey: string) => {
			const config = await getConfig();

			config.set(StorageKeys.OPENAI_API_KEY, apiKey);

			setState({
				uiState: UIState.READY,
			});
		},
		[setState]
	);

	const onSubmitQuery = useCallback(
		async (text: string) => {
			const prevMessage = state.messages.at(-1);

			const current: Message = {
				text,
				id: uuidv4(),
				from: "user",
				conversationId: prevMessage?.conversationId,
				parentMessageId: prevMessage?.id,
			};

			const messages = [...state.messages, current] as Message[];

			setState({
				messages,
				uiState: UIState.WAITING_RESPONSE,
			});

			try {
				const res = await sendMessage(current);

				if (res?.text) {
					const answer: Message = {
						from: "ai",
						id: res.id,
						text: res.text,
						conversationId: res.conversationId,
						parentMessageId: current.id,
					};

					return setState({
						messages: [...messages, answer],
						uiState: UIState.READY,
					});
				}
			} catch (err) {
				console.log("[ERROR]", err);
				if ((err as any)?.statusCode === 401) {
					return setState({
						uiState: UIState.ASK_API_KEY,
					});
				}
			}

			return setState({
				uiState: UIState.READY,
			});
		},
		[setState, state]
	);

	const render = useMemo(() => {
		let render = null;
		switch (state.uiState) {
			case UIState.INIT:
				render = <Init />;
				break;
			case UIState.ASK_API_KEY:
				render = <AskApiKey onSubmit={onSubmitApiKey} />;
				break;
			case UIState.READY:
				render = <Query onSubmit={onSubmitQuery} />;
				break;
			case UIState.WAITING_RESPONSE:
				render = <WaitingResponse />;
				break;
			default:
				break;
		}

		return render;
	}, [state.uiState, onSubmitQuery, onSubmitApiKey]);

	return (
		<Box flexDirection="column">
			<History messages={state.messages} />

			{render}
		</Box>
	);
};

module.exports = App;
export default App;
