import {PipeTransform, Pipe} from '@angular/core';
import {ICharge} from './charge';

@Pipe({
    name: 'chargeFilter'
})

export class ChargeFilterPipe implements PipeTransform{
                transform(value:ICharge[], argLevel:string, argRev:string, argDesc:string, argMod:string): ICharge[]{
                    let levelGroupfilter: string = argLevel ? argLevel.toLocaleLowerCase(): null;
                    let revCodefilter: string = argRev ? argRev.toLocaleLowerCase(): null;
                    let descriptionfilter: string = argDesc ? argDesc.toLocaleLowerCase(): null;
                    let modifiedfilter: string = argMod ? argMod.toLocaleLowerCase(): null;
                    console.log("LevelGrouping: " + levelGroupfilter + " - RevCode: " + revCodefilter  + " - Description: " + descriptionfilter + " - Modified: " + modifiedfilter);

            if(levelGroupfilter){
                value = value.filter((charge: ICharge) =>
                    charge.levelGrouping.toLocaleLowerCase().indexOf(levelGroupfilter) != -1);
                       
            }
             if(revCodefilter){
                value = value.filter((value: ICharge) =>
                value.revCode.toLocaleLowerCase().indexOf(revCodefilter) != -1);
                    
            }
             if(descriptionfilter){
                    value = value.filter((value: ICharge) =>
                    value.chargeDescription.toLocaleLowerCase().indexOf(descriptionfilter) != -1);
            }
            if(modifiedfilter){
                    value = value.filter((value: ICharge) =>
                    value.modified.toLocaleLowerCase().indexOf(modifiedfilter) != -1);
            }
           return value;
                
            }
}