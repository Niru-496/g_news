import { useEffect, useState } from "react";
import DispalyDataCard from "../utils/DisPlayCard";
import Loading from "../utils/Loading";
import NavbarTop from "../utils/Navbar";

export default function Home(params) {
    const [news,Setnews]= useState([])
    const [def, Setdef] = useState("top-headlines");
    const [loading,Setloading]= useState(false)
    const [searchInput, SetsearchInput] = useState('')
    function SetSearchInput(value){
        SetsearchInput(value)
    }



    return (
		<div>
			<NavbarTop callback={SetSearchInput} />
			
		</div>
	);
};
