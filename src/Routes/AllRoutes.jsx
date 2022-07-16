import { Routes, Route, Link } from "react-router-dom";
import DispalyeCard from "../utils/DisPlayCard";
export default function AllRoutes() {
	return (
		<Routes>
			<Route path="/" element={<DispalyeCard/>} />
			{/* <Route path="/search" /> */}
		</Routes>
	);
}
