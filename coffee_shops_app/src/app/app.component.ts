import { Component, OnInit } from '@angular/core';
import { PseudoApiService, ProdusDisponibil } from './pseudo-api.service';
import { CafeneaSauLocalitate } from './cafeneasaulocalitate';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'ExAngular';
  cafeneaToShow: number = 0;
  denumireCafenea: string = 'Please select a coffee shop from the list on the leftside!';
  listaCafele: ProdusDisponibil[] = [];

  constructor(private api: PseudoApiService){}

  // Flat tree control
  flatControl = new FlatTreeControl<CafeneaSauLocalitate>(
    node => node.adancime || 1,
    node => node.fel == 'L' // nu functioneaza collapsing - to solve later
  );
  pseudoFlatTree: CafeneaSauLocalitate[] = [];

  ngOnInit(): void {
    // Obtin lista cu toate cafenelele si toate localitatile
    this.api.ListaLocalitati().subscribe(lista => {
      // setez lista obtinuta de la api ca sursa pentru flat tree din angular material
      this.pseudoFlatTree = lista;
    })
  }
  // returneaza daca nodul curent este collapsable sau nu / daca este localitate sau cafenea
  hasChild(index:number, node: CafeneaSauLocalitate){
    return node.fel == "L";
  }
  // functie care ruleaza cand se da click pe o cafenea din arborele din stanga
  shopClick(id: number, denumire: string){
    this.cafeneaToShow = id;
    this.denumireCafenea = denumire;
    // cer toate produsele disponibile pentru cafeneaua pe care a dat click userul
    this.api.ProduseDisponibile(id).subscribe(cafele => {
      // actualizez lista de cafele pentru cafeneaua selectata
      this.listaCafele = cafele;
    })
  }
}
