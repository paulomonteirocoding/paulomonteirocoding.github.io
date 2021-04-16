import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  items = [
    {
      name: 'Home',
      path: '/',
      icon: 'home'
    },
    {
      name: 'List',
      path: 'list-product',
      icon: 'list'
    },
    {
      name: 'Add',
      path: 'add-product',
      icon: 'add'
    },
    {
      name: 'Remove',
      path: 'remove-product',
      icon: 'remove'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
