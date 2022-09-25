import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  constructor(private dictionaryService:DictionaryService) { }
  word='';
  searchword:any;
  response:any;
  
  ngOnInit(): void {
    this.response = [];
  }
  onSubmit(){
    if(this.word){
      this.searchword = this.word+":";
    }else{
      this.searchword = "";
    }
    
    this.response = [];
    this.dictionaryService.getData(this.word).subscribe((result) => {
      const resultJson = JSON.parse(result);
      // 
      
        resultJson.forEach((value: { meanings: { definitions: { definition: any; }[]; }[]; }) => {
          value.meanings.forEach((ele: { definitions: { definition: any; }[]; }) => {
          ele.definitions.forEach((defination: { definition: any; }) => {
            this.response.push(defination.definition);
            
            
           
           
          });
        });
      });
    },(error)=>{
      this.response = [];
     this.response = ["Sorry, we couldn't find definitions for the word you were looking for.","No Definitions Found","You can try the search again at later time or head to the web instead."]
    });
    
  }
}
