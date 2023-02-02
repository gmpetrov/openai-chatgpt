import React, { FC, useState } from "react";
import { Text, Box, Newline } from "ink";
import TextInput from "ink-text-input";
import { Colors } from "../types";

type Props = {
	onSubmit?: (value: string) => any;
};

const Query: FC<Props> = ({ onSubmit }) => {
	const [query, setQuery] = useState("");

	return (
		<Box>
			<Text color={Colors.USER}>
				Enter your query:
				<Newline />
				<Newline />
				<Text color="white">
					<TextInput value={query} onChange={setQuery} onSubmit={onSubmit} />
				</Text>
			</Text>
		</Box>
	);
};

export default Query;
