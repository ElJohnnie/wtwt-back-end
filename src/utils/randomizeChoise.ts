import { MoviePredicted } from "../interfaces/dtos/mlApi-dto";

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export const randomizeChoice = (argument: MoviePredicted[]) => {
    return argument[getRandomNumber(argument.length)];
}
