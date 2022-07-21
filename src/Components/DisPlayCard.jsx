import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../utils/Loading";
import NavbarTop from "../utils/Navbar";
import CountrySelect from "../utils/CountryOptions";
import LanguageOptions from "../utils/LanguagesOption";
import SearchOption from "../utils/SearchOption";
import Button from "@mui/material/Button";
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

export default function DispalyeCard() {
	const [expanded, setExpanded] = React.useState(false);
	const [news, SetNews] = React.useState([]);
	const [loading, Setloading] = React.useState(false);
	const [country, Setcountry] = React.useState("in");
	const [language, Setlanguage] = React.useState("te");
	// const [search, Setsearch] = React.useState("bmw");
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	async function TopNews(language,country) {
		const Finalresult = await fetch(
			`https://gnews.io/api/v4/top-headlines?max=5&lang=${language}&country=${country}&token=257b8de55938ee7b9d2affc956a93379`
		);
		const result = await Finalresult.json();
		const res = result.articles;
		SetNews(res);
		Setloading(true);


	}


	function ChangeCountry(value) {
		Setcountry(value);
		console.log(country)

	}
	function ChangeLanguage(value) {
		Setlanguage(value);
		console.log(language);

	}
	// function ChangeSearch(value) {
	// 	Setsearch(value);

	// }
	React.useEffect(()=>{
		TopNews()
	},[country,language])


	return (
		<>
			<NavbarTop />
			<div className="HomeDisplayDiv">
				<CountrySelect ChangeCountry={ChangeCountry} />
				<LanguageOptions ChangeLanguage={ChangeLanguage} />
				{/* <SearchOption ChangeSearch={ChangeSearch} /> */}
				<Button
					variant="contained"
					color="success"
					onClick={() => TopNews( language, country)}
				>
					Find
				</Button>
			</div>
			{loading ? (
				<div className="newsDisplayData">
					{news.map((e,i) => {
						return (
							<div
								key={i}
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
		</>
	);
}
