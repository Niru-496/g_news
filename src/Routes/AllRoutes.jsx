import { Routes, Route, Link } from "react-router-dom";
import Home from "../Components/Home";
import DispalyeCard from "../utils/DisPlayCard";
export default function AllRoutes() {
	return (
		<Routes>
			{/* <Route path="/trending" element={<DispalyeCard/>} /> */}
			<Route path="/" element={<Home/>}/>
		</Routes>
	);
}
