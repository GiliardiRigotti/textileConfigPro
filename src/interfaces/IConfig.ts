interface IConfig {
    id?: string;
    comprimento_tear_cru?: number;
    comprimento_tear_acabado?: number;
    largura_tear_cru?: number;
    largura_tear_acabado?: number;
    peso_tear?: number;
    peso_acabado?: number;
    altura_de_felpa?: number;
    densidades?: number[];
    tramas_seletores?: ITramaSeletores;
    urdumes?: IUrdumes;
    obs?: string;

}

interface ITramaSeletores {
    cru?: string | number;
    poliester?: string[] | number[];
}

interface IUrdumes {
    base?: string | number;
    felpa?: string | number;
}
