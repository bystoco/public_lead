export default {
    /**
     * Retorna a cor de fundo da linha/célula com base nas regras de negócio.
     * Use isso na propriedade "Cell Background" das colunas da tabela.
     */
    getRowColor: (lead) => {
        if (!lead) return "transparent";

        // Regra 1: Valor estimado acima de 50.000
        // Substitua 'valor_estimado' pelo nome real da sua coluna
        const isAltoValor = lead.valor_estimado > 50000;

        // Regra 2: Status "Novo" há mais de 3 dias
        let isNovoAtrasado = false;
        
        // Substitua 'status' e 'data_criacao' pelos nomes reais das suas colunas
        if (lead.status === "Novo" && lead.data_criacao) {
            // Calcula a diferença de dias entre hoje e a data de criação
            const diasCriado = moment().diff(moment(lead.data_criacao), 'days');
            
            if (diasCriado > 3) {
                isNovoAtrasado = true;
            }
        }

        // Aplica a cor visual dependendo da regra acionada
        if (isAltoValor && isNovoAtrasado) {
            return "#fca5a5"; // Vermelho claro (se ambas as regras baterem)
        } else if (isAltoValor) {
            return "#fef08a"; // Amarelo claro (Alto valor)
        } else if (isNovoAtrasado) {
            return "#fed7aa"; // Laranja claro (Atrasado)
        }

        return "transparent"; // Cor padrão
    }
}