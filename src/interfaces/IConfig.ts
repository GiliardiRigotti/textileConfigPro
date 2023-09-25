interface IConfig {
    id?: string;
    comprimento_tear_cru?: number;
    comprimento_tear_acabado?: number;
    largura_tear_cru?: number;
    largura_tear_acabado?: number;
    peso_tear?: number;
    peso_acabado?: number;
    altura_de_felpa?: number;
    densidades?: {
        1?: number;
        2?: number;
        3?: number;
    };
    tramas_seletores?: ITramaSeletores;
    urdumes?: IUrdumes;
    obs?: string;

}

interface ITramaSeletores {
    cru?: string | number;
    poliester?: {
        1?: number;
        2?: number;
        3?: number;
    };
}

interface IUrdumes {
    base?: string | number;
    felpa?: string | number;
}
