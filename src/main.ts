// import './infrastructure/tracing/tracing';

import app from "./infrastructure/server";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
