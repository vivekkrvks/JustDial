import React, { useImperativeHandle, Suspense } from "react";
import clsx from "clsx";
import { makeStyles, IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { amber, green } from "@mui/material/colors";
import { MdError, MdInfo, MdClose, MdWarning, MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import { forwardRef } from "react";

const variantIcon = {
	success: MdCheckCircle,
	warning: MdWarning,
	error: MdError,
	info: MdInfo,
};

const useStyles = makeStyles((theme) => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.main,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: "flex",
		alignItems: "center",
	},
	margin: {
		margin: theme.spacing(1),
	},
}));

const MySnackbar = forwardRef((props, ref) => {
	const classes = useStyles();
	const [data, setData] = useState({ message: "", variant: "success" });
	const [open, setOpen] = useState(false);
	const Icon = variantIcon[data.variant];
	useImperativeHandle(ref, () => ({
		handleSnack(a) {
			setData(a);
			setOpen(!open);
		},
	}));

	return (
		<Suspense fallback={null}>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				open={open}
				onClose={() => setOpen(false)}
				autoHideDuration={5000}
			>
				<SnackbarContent
					className={clsx(classes[data.variant], classes)}
					aria-describedby="client-snackbar"
					message={
						<span id="client-snackbar" className={classes.message}>
							<Icon className={clsx(classes.icon, classes.iconVariant)} />
							{data.message}
						</span>
					}
					action={[
						<IconButton key="close" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
							<MdClose className={classes.icon} />
						</IconButton>,
					]}
				/>
			</Snackbar>
		</Suspense>
	);
});

export default MySnackbar;
