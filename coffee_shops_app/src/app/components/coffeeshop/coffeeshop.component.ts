import { Component, OnInit, Input } from '@angular/core';
import { PseudoApiService, ProdusDisponibil } from '../../pseudo-api.service';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-coffeeshop',
  templateUrl: './coffeeshop.component.html',
  styleUrls: ['./coffeeshop.component.scss']
})
export class CoffeeshopComponent implements OnInit {
  @Input()  cafeneaToShow: number   = 0;
  @Input()  denumireCafenea: string = '';
  @Input()  listaCafele: ProdusDisponibil[] = [];
  isNumber:     any;
  searchValue:  string = '';
  searchVal2:   string  = '';
  modelChanged = new Subject<string>();

  constructor(private api: PseudoApiService) {
    this.modelChanged
      .pipe(
        debounceTime(250))
      .subscribe((val) => {
        // programul asteapta 250 ms inainte sa actualizeze valoarea pentru care se face search
        this.searchVal2 = val;
        this.isNumber = Number(val)
        // debug
        console.log("Caut pentru numar(daca este doar nr introdus): ", this.isNumber, " sau valoarea: ", this.searchVal2);
      })
  }

  ngOnInit(): void { }

  changed() {
    this.modelChanged.next(this.searchValue);
  }
  includesAllWords(words:string, nume:string, descriere:string):boolean{
    const wordsToCheck  = words.toLowerCase().split(' ');
    let count:number    = 0;
    wordsToCheck.forEach(word => {
      if(nume.toLowerCase().includes(word) || descriere.toLowerCase().includes(word)){
        count++;
      }
    });
    // daca am gasit toate cuvintele in descriptie sau denumire
    if(count == wordsToCheck.length){
      return true;
    }
    return false;
  }
}
