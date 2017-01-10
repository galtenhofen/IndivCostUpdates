import {ICharge} from './charge';

export interface IResponse {
   jsxid: string
   providerId: string
   dataFileGroupId: string
   userName: string
   caseNumber: string
   chargeList: ICharge[]
        
}

