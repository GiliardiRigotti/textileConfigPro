interface IClient {
    id?: string;
    name: string;
    phone: string;
    email: string;
}

interface IDesignation {
    id?: string;
    equipmentId: string;
    userId: string;
}

interface IOrder {
    id?: string;
    order: string;
    many: number;
    clientId: string;
    filename: string;
    config?: IConfig;
    equipmentId?: string;
}

interface IOrderView {
    id?: string,
    order: IOrder,
    equipment: IEquipment,
    client: IClient
}

export { IClient, IDesignation, IOrder, IOrderView }