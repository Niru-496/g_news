import * as React from "react";
import { useEffect, useState } from "react";
import DispalyDataCard from "./DisPlayCard";
import Loading from "../utils/Loading";
import NavbarTop from "../utils/Navbar";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { green, red } from "@mui/material/colors";
import { CardActions, CardContent, CardMedia, Collapse, Typography } from "@mui/material";
const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));
export default function Home(params) {
	const [expanded, setExpanded] = React.useState(false);
	const [news, SetNews] = React.useState([]);
	const [loading, Setloading] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	async function TopNews() {
		const Finalresult = await fetch(
			"https://gnews.io/api/v4/top-headlines?max=5&token=257b8de55938ee7b9d2affc956a93379"
		);
		const result = await Finalresult.json();
		const res = result.articles;
		SetNews(res);
		Setloading(true);
	}

	React.useEffect(() => {
		TopNews();
	}, []);

	return (
		<div>
			<NavbarTop />
			<div>
				{loading ? (
					<div className="HomeDisplayDiv">
						{news.map((e) => {
							return (
								<div
									key={e.publishedAt}
									className="newsDisplayData"
								>
									<Card sx={{ maxWidth: 345 }}>
										<CardHeader
											avatar={
												<Avatar
													sx={{ bgcolor: red[500] }}
													aria-label="recipe"
												>
													T
												</Avatar>
											}
											action={
												<IconButton aria-label="settings">
													<MoreVertIcon />
												</IconButton>
											}
											title={e.title}
											subheader={e.publishedAt}
										/>
										<CardMedia
											component="img"
											height="194"
											image={e.image}
											alt={e.source.name}
										/>
										<CardContent>
											<Typography
												variant="body2"
												color="text.secondary"
											>
												{e.description}
											</Typography>
										</CardContent>
										<CardActions disableSpacing>
											<IconButton aria-label="add to favorites">
												<FavoriteIcon />
											</IconButton>
											<IconButton aria-label="share">
												<ShareIcon />
											</IconButton>
											<ExpandMore
												expand={expanded}
												onClick={handleExpandClick}
												aria-expanded={expanded}
												aria-label="show more"
											>
												<ExpandMoreIcon />
											</ExpandMore>
										</CardActions>
										<Collapse
											in={expanded}
											timeout="auto"
											unmountOnExit
										>
											<CardContent>
												<Typography paragraph>
													Content:
												</Typography>
												<Typography paragraph>
													{e.content}
												</Typography>
											</CardContent>
										</Collapse>
									</Card>
								</div>
							);
						})}
					</div>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
}
