import React, { FC, useCallback, useEffect, useMemo, useReducer } from "react";
import { Box, Newline } from "ink";
import History from "./History";
import AskInput from "./AskInput";
import Query from "./Query";
import { ApiType, Message, StorageKeys, UIState } from "../types";
import sendMessage from "../utils/send-message";
import getConfig from "../utils/get-config";
import WaitingResponse from "./WaitingResponse";
import { v4 as uuidv4 } from "uuid";

import Init from "./Init";
import AskApiType from "./AskApiType";

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
			const accessToken = config.get(StorageKeys.ACCESS_TOKEN_KEY);

			if ((!openaiApiKey && !accessToken) || reset) {
				config.delete(StorageKeys.API_TYPE);
				config.delete(StorageKeys.OPENAI_API_KEY);
				config.delete(StorageKeys.ACCESS_TOKEN_KEY);

				return setState({
					uiState: UIState.ASK_API_TYPE,
				});
			}

			return setState({
				uiState: UIState.READY,
			});
		})();
	}, []);

	const onSubmitToken = useCallback(
		(storageKey: StorageKeys) => async (token: string) => {
			const config = await getConfig();

			config.set(storageKey, token);

			setState({
				uiState: UIState.READY,
			});
		},
		[setState]
	);

	const onSubmitApiType = useCallback(
		async (type: ApiType) => {
			const config = await getConfig();

			config.set(StorageKeys.API_TYPE, type);

			const nextState =
				type === ApiType.OFFICIAL
					? UIState.ASK_API_KEY
					: UIState.ASK_ACCESS_TOKEN;

			setState({
				uiState: nextState,
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
						uiState: UIState.ASK_API_TYPE,
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
				render = (
					<AskInput
						message="Enter your OpenAI API Key [https://platform.openai.com/account/api-keys]"
						onSubmit={onSubmitToken(StorageKeys.OPENAI_API_KEY)}
					/>
				);
				break;
			case UIState.ASK_ACCESS_TOKEN:
				render = (
					<AskInput
						message="Enter your Access Token [https://github.com/transitive-bullshit/chatgpt-api#access-token]"
						onSubmit={onSubmitToken(StorageKeys.ACCESS_TOKEN_KEY)}
					/>
				);
				break;
			case UIState.ASK_API_TYPE:
				render = (
					<AskApiType
						message="Api Type: (more info: [https://github.com/transitive-bullshit/chatgpt-api#usage])"
						onSubmit={onSubmitApiType as any}
					/>
				);
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
	}, [state.uiState, onSubmitQuery, onSubmitToken]);

	return (
		<Box flexDirection="column">
			<History messages={state.messages} />
			<Newline />
			{render}
		</Box>
	);
};

module.exports = App;
export default App;
