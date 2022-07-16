import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchOption({ChangeSearch}) {
    const [str,setStr] = React.useState("")
    const handleChange = (event) => {
		const value = event.target.value.toLowerCase();
		setStr(event.target.value);
		// console.log(value)
		ChangeSearch(value);
	};
	return (
		<Box
			sx={{
				width: 500,
				maxWidth: "100%",
			}}
		>
			<TextField
				fullWidth
				label="Search"
				id="fullWidth"
				onChange={handleChange}
			/>
		</Box>
	);
}
