import React, { FC } from "react";
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";
import { ApiType } from "../types";

type Props = {
	message: string;
	onSubmit?: (value: string) => any;
};

const AskInput: FC<Props> = ({ onSubmit, message }) => {
	const items = [
		{
			label: "Official OpenAI API (text-davinci-003)",
			value: ApiType.OFFICIAL,
		},
		{
			label: "Unofficial API (Free)",
			value: ApiType.UNOFFICIAL,
		},
	];

	const handleSelect = (item: (typeof items)[0]) => {
		onSubmit?.(item?.value);
	};

	return (
		<Box flexDirection="column">
			<Text color={"yellow"}>{message}:</Text>

			<Box paddingLeft={1} marginTop={1}>
				<SelectInput items={items} onSelect={handleSelect} />
			</Box>
		</Box>
	);
};

export default AskInput;
