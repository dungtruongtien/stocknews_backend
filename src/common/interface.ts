export interface IStockNews {
    link: string
    title: string
    originLink: string
    shortDescription: string
    createdDate: Date
    image: string
}


export interface INewsQueryInput {
    from?: number
    size?: number
}
