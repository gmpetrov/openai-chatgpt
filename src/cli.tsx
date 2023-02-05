#!/usr/bin/env node
import "./utils/fetch-polyfill";
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./components/App";

const cli = meow(
	`
	Usage
	  $ openai-chatgpt

	Options
		--reset  Reset Openai API Key

	Examples
	  $ openai-chatgpt
`,
	{
		flags: {
			reset: {
				type: "boolean",
			},
		},
	}
);

render(<App reset={cli.flags.reset} />);
