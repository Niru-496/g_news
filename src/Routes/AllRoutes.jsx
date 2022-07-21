import { Routes, Route, Link } from "react-router-dom";
import Home from "../Components/Home";
import DispalyeCard from "../Components/DisPlayCard";
import SearchDisplay from "../Components/SearchDisplay";
export default function AllRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/trending" element={<DispalyeCard />} />
			<Route path="/search" element={<SearchDisplay />} />
		</Routes>
	);
}
