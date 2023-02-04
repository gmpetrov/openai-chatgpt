import React, { FC, useState } from "react";
import { Text, Box } from "ink";
import TextInput from "ink-text-input";

type Props = {
	onSubmit?: (value: string) => any;
};

const Query: FC<Props> = ({ onSubmit }) => {
	const [query, setQuery] = useState("");

	return (
		<Box>
			<Box marginRight={1}>
				<Text color="gray">[Enter your query]:</Text>
			</Box>
			<Box>
				<Text color="white">
					<TextInput value={query} onChange={setQuery} onSubmit={onSubmit} />
				</Text>
			</Box>
		</Box>
	);
};

export default Query;
