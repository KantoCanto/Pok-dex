//jshint esversion:6
const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {

    //array of promises
    const promises = [];

    //itterate from 1 to 150 and call the api in order to fetch each of the pokemons data
    for (let i = 1; i <= 150; i++){

        const url = 'https://pokeapi.co/api/v2/pokemon/' + i;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then( results => {

        //the map function will itterate through an array of items and create
        //a new array by converting each item in some way
        const pokemon = results.map( data => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types
            .map((type) => type.type.name)
            .join(', ')
        }))
        displayPokemon(pokemon);
    })
}

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( pokemonUnit => "
    <li>
        <img src="${pokemonUnit.image}"/>
        <h2>${pokemonUnit.id}. ${pokemonUnit.name}</h2>
        <p>TYPE: ${pokemonUnit.type}</p>
    </li>
    ")
    pokedex.innerHTML = html;
}

fetchPokemon();