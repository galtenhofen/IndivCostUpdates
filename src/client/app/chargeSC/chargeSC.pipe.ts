import {PipeTransform, Pipe} from '@angular/core';
import {IChargeSC} from './chargeSC';

@Pipe({
    name: 'chargeSCFilter'
})

export class ChargeSCFilterPipe implements PipeTransform{
                transform(value:IChargeSC[], argLevel:string, argRev:string, argDesc:string, argMod:string): IChargeSC[]{
                    let levelGroupfilter: string = argLevel ? argLevel.toLocaleLowerCase(): null;
                    let revCodefilter: string = argRev ? argRev.toLocaleLowerCase(): null;
                    let descriptionfilter: string = argDesc ? argDesc.toLocaleLowerCase(): null;
                    let modifiedfilter: string = argMod ? argMod.toLocaleLowerCase(): null;
                    console.log("LevelGrouping: " + levelGroupfilter + " - RevCode: " + revCodefilter  + " - Description: " + descriptionfilter + " - Modified: " + modifiedfilter);

            if(levelGroupfilter){
                value = value.filter((charge: IChargeSC) =>
                    charge.levelGrouping.toLocaleLowerCase().indexOf(levelGroupfilter) != -1);
                       
            }
             if(revCodefilter){
                value = value.filter((value: IChargeSC) =>
                value.revCode.toLocaleLowerCase().indexOf(revCodefilter) != -1);
                    
            }
             if(descriptionfilter){
                    value = value.filter((value: IChargeSC) =>
                    value.chargeDescription.toLocaleLowerCase().indexOf(descriptionfilter) != -1);
            }
            if(modifiedfilter){
                    value = value.filter((value: IChargeSC) =>
                    value.modified.toLocaleLowerCase().indexOf(modifiedfilter) != -1);
            }
           return value;
                
            }
}