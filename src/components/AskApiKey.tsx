import React, { FC, useState } from "react";
import { Text, Box } from "ink";
import TextInput from "ink-text-input";

type Props = {
	onSubmit?: (value: string) => any;
};

const AskToken: FC<Props> = ({ onSubmit }) => {
	const [query, setQuery] = useState("");

	return (
		<Box>
			<Text color={"yellow"}>
				{
					"Enter your OpenAI API Key [https://platform.openai.com/account/api-keys]"
				}
				:
			</Text>

			<Box paddingLeft={1}>
				<Text color="white">
					<TextInput
						mask="*"
						value={query}
						onChange={setQuery}
						onSubmit={onSubmit}
					/>
				</Text>
			</Box>
		</Box>
	);
};

export default AskToken;
