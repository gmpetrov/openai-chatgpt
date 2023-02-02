import React, { FC } from "react";
import { Text, Box } from "ink";
import Spinner from "ink-spinner";

const WaitingResponse: FC = () => {
	return (
		<Box>
			<Text color="green">
				<Spinner type="dots" />
				{" Initializing"}
			</Text>
		</Box>
	);
};

export default WaitingResponse;
