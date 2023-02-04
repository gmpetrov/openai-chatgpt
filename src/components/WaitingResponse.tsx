import React, { FC } from "react";
import { Text, Box } from "ink";
import Spinner from "ink-spinner";

const WaitingResponse: FC = () => {
	return (
		<Box>
			<Box marginRight={1}>
				<Text color="green">
					<Spinner type="dots" />
				</Text>
			</Box>
			<Text color="gray">{"Waiting Response"}</Text>
		</Box>
	);
};

export default WaitingResponse;
