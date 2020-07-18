export interface IArchiveItem{
    Name:string,
    Price:string,
    Currency:string,
    Time:number
}

export interface IInputItem{
    Name:string,
    Url:string,
    ChaosAlert:number,
    ExaltedAlert:number
}

export interface IRaportItem{
    Name:string,
    Values:IRaportItemValue[]
}

export interface IRaportItemValue{
    value:number,
    date:number,
    currency:string
}

export interface StringPair{
    key:string,
    value:string,
    status:string,
}

export interface IItem{
    Name:string,
    Path:string,
    Price:string,
    Currency:string,
    ID:string,
    Notify:string,
    LastNotify:string
}