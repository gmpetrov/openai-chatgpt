import React, { FC, useMemo } from "react";
import { Text, Box, Newline, Static } from "ink";
import { Colors, Message } from "../types";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";

type Props = {
	messages: Message[];
};

const History: FC<Props> = ({ messages }) => {
	// Only wan I've found to add header inside a Static component.
	const messagesWithHeader = useMemo(() => {
		return ["header" as any, ...messages];
	}, [messages]);

	return (
		<Box flexDirection="column">
			<Static items={messagesWithHeader}>
				{(msg, idx) => (
					<Box key={idx}>
						{idx === 0 ? (
							<Gradient name="retro">
								<BigText text="ChatGPT" />
							</Gradient>
						) : (
							<Text color={msg.from === "user" ? Colors.USER : Colors.AI}>
								{msg.from === "user" ? (
									"[me]"
								) : (
									<Gradient name={Colors.AI_GRADIENT}>{"[chatgpt]"}</Gradient>
								)}

								<Newline />
								<Newline />

								<Text color="white">{msg.text}</Text>

								<Newline />
								<Newline />
							</Text>
						)}
					</Box>
				)}
			</Static>
		</Box>
	);
};

export default History;
