export const mockMLApiServiceImp = {
    command: jest.fn().mockResolvedValue([
        { title: 'Movie 1', genres: ['Comedy'] },
        { title: 'Movie 2', genres: ['Romance'] }
    ])
};

export const mockTMDBApiExternalService = {
    command: jest.fn().mockResolvedValue({
        results: [
            {
                id: 1,
                backdrop_path: '/path/to/backdrop',
                vote_average: 8.5,
                title: 'Movie 1',
                overview: 'Overview of Movie 1'
            }
        ]
    })
};
