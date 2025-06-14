import { ParamSourceType } from "./ParamSourceType";

export interface ParamMetaData  {
    index: number;
    type: ParamSourceType;
    name?: string;
    resolver?: (Req: any, Res: any, next: any) => any;
}