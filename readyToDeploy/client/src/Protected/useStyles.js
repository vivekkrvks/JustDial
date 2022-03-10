import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
	entryArea: {
		marginTop: 3,
		marginBottom: 0,
		padding: 10,
		paddingTop: 0,
		marginLeft: "auto",
		marginRight: "auto",
		backgroundImage: "linear-gradient(-180deg, #FFFEFF 0%, #D7FFFE 100%)",
		maxWidth: "98%",
	},
	button: {
		margin: 2,
		"& svg": {
			fontSize: "x-large",
		},
	},
	search: {
		position: "relative",
		borderRadius: 2,
		backgroundColor: alpha("#2196F3", 0.15),
		"&:hover": {
			backgroundColor: alpha("#2196F3", 0.35),
		},
		margin: 10,
		width: "100%",
		backgroundImage: "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)",
		// [theme.breakpoints.up("xs")]: {
		// 	marginLeft: 0,
		// 	width: "auto",
		// },
	},
	searchIcon: {
		width: 8,
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	searchIcon2: {
		width: 20,
		display: "flex",
		alignItems: "right",
		justifyContent: "right",
	},
	input: {
		display: "flex",
		padding: 0,
	},
	inputRoot: {
		color: "inherit",
		width: "100%",
	},
	inputInput: {
		paddingTop: 0,
		paddingRight:0,
		paddingBottom: 0,
		paddingLeft: 10,
		// transition: theme.transitions.create("width"),

		width: "100%",
	},
	searchResult: {
		margin: 10,
		border: "1px solid #EACCF8",
		overflowX: "hidden",
	},
}));

export default useStyles;
