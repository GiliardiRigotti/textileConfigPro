interface IClient {
    id?: string;
    name: string;
    phone: string;
    email: string;
}

interface IDesignation {
    id?: string;
    equipamentId: string;
    userId: string;
}

interface IOrder {
    id?: string;
    order: string;
    many: number;
    clientId: string;
    filename: string;
    config?: IConfig;
    equipamentId?: string;
}

export { IClient, IDesignation, IOrder }