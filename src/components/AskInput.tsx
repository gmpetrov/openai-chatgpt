import React, { FC, useState } from "react";
import { Text, Box } from "ink";
import TextInput from "ink-text-input";

type Props = {
	message: string;
	onSubmit?: (value: string) => any;
};

const AskInput: FC<Props> = ({ onSubmit, message }) => {
	const [query, setQuery] = useState("");

	return (
		<Box>
			<Text color={"yellow"}>{message}:</Text>

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

export default AskInput;
