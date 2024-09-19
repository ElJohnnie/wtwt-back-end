import { MoviePredicted } from "../interfaces/mlApiServiceInterface";

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export const randomizeChoice = (argument: MoviePredicted[]) => {
    return argument[getRandomNumber(argument.length)];
}
