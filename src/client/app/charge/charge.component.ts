import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {ChargeFilterPipe} from './charge.pipe';
import {Observable} from 'rxjs/Observable';
import { HomeService } from '../home/home.service';
import {ICharge} from './charge';
import {IUpdate} from './update';
import {IResponse} from './response';
import {IReport} from './report';

/**
 * This class represents the lazy loaded ChargeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'non-charge',
  templateUrl: 'charge.component.html',
  styleUrls: ['charge.component.css'],
})
export class ChargeComponent implements OnInit {

    fetchMethod: string = "http";
    existingCharges:any[] = [];

    levelGroupFilter: string;
    revCodeFilter: string;
    descriptionFilter: string;
    modifiedFilter: string;


  errorMessage: string;
    pageTitle: string = 'Individual Cost Updates';
   // errorMessage: string;
    httpStatus: string;
    batchId: string;
    providerId: string;
    dataFileGroupId: string;
    userName: string;
    caseNumber: string;
    jsxid: number;
    
    postUpdates: string;
  
    update: IUpdate;
    updateObjects: IUpdate[] = [];

    reviewedList: string[] = [];

    response: IResponse;
    singleCharge: ICharge;
    charges: ICharge[] = [];

    confirmResponse:string = '';
    loading: boolean = false;
    override: boolean = false;
    attempt: boolean;
    updating: boolean = false;
    updatingError: boolean = false;

    showModified:string = 'nolight-class';
    showUnModified:string = 'nolight-class';
    showAll:string = 'highlight-class';
  

  /**
   * Creates an instance of the ChargeComponent with the injected
   * Charge.
   *
   * @param {ChargeService} ChargeService - The injected Charge.
   */
  constructor(public _chargeService: HomeService) {this.loading = this._chargeService.loading;}

  /**
   * Get the charges OnInit
   */
  ngOnInit() {
    console.log('IN onInIt   this.charges stringify: ' + JSON.stringify(this.charges));
    this.revCodeFilter = "";
    this.levelGroupFilter = "Implant";
   this.callGetChargeList();

  }



onClickrefreshChargeList(): void{
            console.log('Refresh button clicked.');
            this.callGetChargeList();
            }

callGetChargeList():void{
     this.fetchMethod = this.checkLocalStorage();
     console.log('Retrieving Charges from ' + this.fetchMethod);

            if(this.fetchMethod === "local"){
               this.errorMessage = "";
                this.charges = [];
                this.loading = true;

                //LOOP THIS TO PUSH ALL ITEMS INTO INTERFACE ARRAY

                //this.existingCharges = JSON.stringify(localStorage.getItem("nonSubcodedCharges"));

                for (var j = 0; j < this.existingCharges.length; j++){

                this.singleCharge = this.existingCharges[j];

                console.log(this.existingCharges[j]);

                this.charges.push(this.singleCharge);
                }

                this.loading = false;
            }
            else{


                this.errorMessage = "";
                this.charges = [];
                this.loading = true;
                this.dataFileGroupId = "878";
                    this._chargeService.getCharges(this.dataFileGroupId)
                    .subscribe(
                        response => this.charges = response.chargeList,
                        error => this.onRequestComplete("Get Charges", error),
                        () => this.onRequestComplete("Get Charges", "200"));

            }
                console.log('Leaving callGetChargeListthis.loading: ' + this.loading);


        }            




    checkLocalStorage():string{
        console.log('ENTERING checkLocalStorage');

        var strCharges = localStorage.getItem("nonSubcodedCharges");
        this.existingCharges = JSON.parse(strCharges);

       console.log('In checkLocalStorage  strCharges:' + strCharges);
       console.log('In checkLocalStorage  existingCharges:' + JSON.stringify(this.existingCharges));
        

            if (!this.existingCharges){
                return "http";
            }
            else{
                return "local";
                }
            
    }

  onRequestComplete(action:any, result:any){
            console.log('ENTERING onRequestComplete  Action Performed: ' + action + '  Result: ' + result);
                if(action == "Get Charges"){
                    if(result == "200")
                        {
                            this.loading = this._chargeService.loading;
                            //this.charges.push(this.singleCharge);
                        }
                     else{
                          setTimeout(() => 
                            {
                            console.log("ERROR BRO");
                            this.errorMessage = result;
                            this.loading = false;
                          //  this.showErrorDialog(action, result);
                             },
                            1000);
                     }   

                    }
                else if(action == "Submit Charges"){
                    if(result == "200")
                        {
                            //this.updating = false;
                            console.log("SUCCESS");
                         //   this.reinitialize();
                        }
                    else{
  //Timeout to ensure errorDialog reappears                          
                            setTimeout(() => 
                            {
                                console.log("ERROR BRO");
                                this.errorMessage = result;
                               // this.showErrorDialog(action, result);
                                //this.updating = false;
                            },
                            1000);
                    }

                }

        console.log("Loading?: " + this.loading);
        console.log("Error?: " + this.errorMessage);
        console.log("Charges: " + JSON.stringify(this.charges));
        console.log('LEAVING onRequestComplete');
        }




       makeTableScroll() {
            var maxRows = 20;

            var table: any = (<HTMLInputElement>document.getElementById('chargesTable')).value;
            var wrapper: any = (<HTMLInputElement>document.getElementById('chargesTable')).parentNode;
            //var wrapper = table.parentNode;
            var rowsInTable = table.rows.length;
            var height = 0;
            if (rowsInTable > maxRows) {
                for (var i = 0; i < maxRows; i++) {
                    height += table.rows[i].clientHeight;
                }
                wrapper.style.height = height + "px";
            }
        }

    onClickFilterNone(): void{
            console.log("IN onClickFilterNone")
            this.modifiedFilter = "";
            this.showModified = 'nolight-class';
            this.showUnModified = 'nolight-class';
            this.showAll = 'highlight-class';
        }

     onClickFilterModified(): void{
            console.log("IN onClickFilterModified")
            this.modifiedFilter = "Y";
            this.showModified = 'highlight-class';
            this.showUnModified = 'nolight-class';
            this.showAll = 'nolight-class';
        }


        onClickFilterUnmodified(): void{
            console.log("IN onClickFilterUnodified")
            this.modifiedFilter = "N";
            this.showModified = 'nolight-class';
            this.showUnModified = 'highlight-class';
            this.showAll = 'nolight-class';
        }

         onClickClearFilters(): void{
            console.log("IN onClickClearFilters")
            this.modifiedFilter = "";
            this.revCodeFilter = "";
            this.descriptionFilter= "";
            this.showModified = 'nolight-class';
            this.showUnModified = 'nolight-class';
            this.showAll = 'highlight-class';
            
        }


onToggleReviewed(jsxid:string, varCost:number, reviewed:boolean): void{
        console.log('Reviewed button clicked.  CDMItemKey: ' + jsxid + '  Reviewed? = ' + reviewed);
        console.log('Current ReviewedList: ' + this.reviewedList)

//if the jsxid id exists, remove current value first
for(var i = 0; i <  this.reviewedList.length; i++) {
                if( this.reviewedList[i] == jsxid) {
                     this.reviewedList.splice(i, 1);
                    break;
                    }
        }


        if(reviewed == true){
        //then add it in if updated = true
        this.reviewedList.push(jsxid);
        
        for(var i = 0; i <  this.charges.length; i++) {
                    if( this.charges[i].jsxid == jsxid) {
                         this.charges[i].modified = "Y";
                        break;
                        }
                    }

        }
        else if(varCost == null){
             for(var i = 0; i <  this.charges.length; i++) {
                    if( this.charges[i].jsxid == jsxid) {
                         this.charges[i].modified = "N";
                        break;
                        }
                    }
        }

        

        console.log('reviewedList: ' + this.reviewedList);
        console.log('charges length: ' + this.charges.length);


    }
onUpdateVarCost(jsxid:string, revCode: string, varCost:number, chargeId: string, reviewed:boolean): void{
        console.log('VarCost Updated.  jsxid: ' + jsxid + '  Current value = ' + varCost);
     if (varCost == null || varCost>=1){
       this.update = {"jsxid": jsxid, "revCode": revCode,  "newVarCost": varCost, "chargeId": chargeId  };

    //if this batchid is already in the updated array, need to delete it before adding new value
        if(varCost != null){
            
            for(var i = 0; i <  this.updateObjects.length; i++) {
                if( this.updateObjects[i].jsxid == jsxid) {
                     this.updateObjects.splice(i, 1);
                    break;
                    }
            }

        this.updateObjects.push(this.update);

        console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
        }
        else{

            for(var i = 0; i <  this.updateObjects.length; i++) {
                if( this.updateObjects[i].jsxid == jsxid) {
                     this.updateObjects.splice(i, 1);
                    break;
                    }
                }
               

          console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
          
        }

         //Trying to find the object in the array of charge objects to update newVarCost
                for(var i = 0; i <  this.charges.length; i++) {
                    if( this.charges[i].jsxid == jsxid) {
                         this.charges[i].newVarCost = varCost;
                         if(varCost !=null || reviewed == true){
                         this.charges[i].modified = "Y";
                         }
                         else{
                             this.charges[i].modified = "N";
                         }
                        break;
                        }
                    }

        console.log('stringify updateObj: ' + JSON.stringify(this.charges));
              
        console.log('updateObjects length: ' + this.updateObjects.length);

        console.log('charges length: ' + this.charges.length);
       // this.canEnableButtons();    
        }
        else{
           // alert("Value must be a number greater or equal to one.");
            var targetCell = "updateVarCost"+jsxid;
            (<HTMLInputElement> document.getElementById(targetCell)).value = "";
           
        }
    }

        onClickLevelGrouping(value:any): void{
        console.log('LevelGrouping Chosen:  Filter by: ' + value);
         
        }

    onClickSubmit(): void{
        console.log('IN onClickSubmit - Reports to send:' + JSON.stringify(this.reviewedList));
   /*
    if(confirm('Are you sure you want to submit the selected reports and close the Prelim Reports App?')){

                this._chargeService.postReportList(this.reportList)
                .subscribe(
                    data => this.postUpdates = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);

                    }
                    */
    }


        ngOnDestroy() {
            console.log('IN OnDestroy   this.charges stringify: ' + JSON.stringify(this.charges));
            this.saveChargeList();
             }

        saveChargeList(){
            var savedNonCharges = JSON.stringify(this.charges);

            //var singleSavedNonCharge = JSON.stringify(this.singleCharge);

            console.log('IN saveChargeList  savedNonCharges :  ' + savedNonCharges) ;
            localStorage.setItem("nonSubcodedCharges", savedNonCharges);

            // FOR WHEN WE GET A BACKEND:
           /* this._chargeService.saveCharges(this.charges)
                .subscribe(
                    data => this.postUpdates = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);
                    */
            }


    


}
