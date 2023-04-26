export interface IPokemon {
  id: number,
  name: string,
  moves: Array<IPokemonMove>;
  abilities: Array<IPockemonAbility>,
  base_experience: number;
  location_area_encounters: string;
  order: number;
  species: {
    name: string,
    url: string
  },
  sprites: IPokemonSprite,
  types: Array<{
    type: {
      name: string;
      url: string
    }
  }>,
  weight: number;
  height: number;
  _color?: string;
}

export interface IPockemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string
    };
    version_group: {
      name: string;
      url: string
    }
  }>
}

export interface IPokemonSprite {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
  other: {
    dream_world: {
      front_default: string
    }
  }
}

export interface IPokemonItem {
  count: number;
  previous?: string | null;
  next?: string | null;
  results: Array<{
    name: string;
    url: string
  }>
}
