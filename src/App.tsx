import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PokemonColection from "./components/PokemonColection";
import { Pokemon } from "./interface";

interface Pokemons {
	name: string;
	url: string;
}

export interface Detail {
	id: number;
	isOpened: boolean;
}

const App: React.FC = () => {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);
	const [nextUrl, setNextUrl] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [detail, setDetail] = useState<Detail>({
		id: 0,
		isOpened: false,
	});
	useEffect(() => {
		const getPokemon = async () => {
			const res = await axios.get(
				"https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
			);
			setNextUrl(res.data.next);
			res.data.results.forEach(async (pokemon: Pokemons) => {
				const poke = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
				);
				setPokemon((p) => [...p, poke.data]);
				setLoading(false);
			});
		};
		getPokemon();
	}, []);
	const nextPage = async () => {
		setLoading(true);
		let res = await axios.get(nextUrl);
		console.log("next:", res.data);
		setNextUrl(res.data.next);
		res.data.results.forEach(async (pokemon: Pokemons) => {
			const poke = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
			);
			setPokemon((p) => [...p, poke.data]);
			setLoading(false);
		});
	};
	return (
		<div className="App">
			<div className="container">
				<header className="pokemon-header">POKEMON</header>
				<PokemonColection
					pokemon={pokemon}
					detail={detail}
					setDetail={setDetail}
				/>
				<div className="btn">
					{!detail.isOpened && (
						<button onClick={nextPage}>
							{loading ? "loading..." : "load more"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
