import React from "react";
import { PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { Detail } from "../App";
interface Props {
	pokemon: PokemonDetail[];
	detail: Detail;
	setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection: React.FC<Props> = (props) => {
	const selectPokemon = (id: number) => {
		if (!detail.isOpened) {
			setDetail({
				id: id,
				isOpened: true,
			});
		}
	};
	const { pokemon, detail, setDetail } = props;
	return (
		<>
			<section
				className={
					detail.isOpened
						? "collection-container-active"
						: "collection-container"
				}
			>
				{detail.isOpened ? (
					<div className="overlay"></div>
				) : (
					<div className=""></div>
				)}
				{pokemon.map((poke) => (
					<div key={poke.id} onClick={() => selectPokemon(poke.id)}>
						<PokemonList
							detail={detail}
							setDetail={setDetail}
							name={poke.name}
							id={poke.id}
							image={poke.sprites.front_default}
							abilities={poke.abilities}
						/>
					</div>
				))}
			</section>
		</>
	);
};

export default PokemonColection;
