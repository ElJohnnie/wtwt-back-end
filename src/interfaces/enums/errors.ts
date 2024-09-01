export enum Errors {
    Bootstrap = 'Erro: não foi possível iniciar a aplicação',
    MongoClient = 'Erro ao conectar ao MongoDB',
    Route = 'Erro: erro na rota',
    NoTokenProvided = 'Erro: não há token de autorização',
    TokenInvalid = 'Erro: token inválido',
    InvalidData = 'Erro: Dados inválidos',
    NotFoundData = 'Erro: Nenhum filme recomendado encontrado',
    InternalError = 'Erro: erro interno de servidor'
}
